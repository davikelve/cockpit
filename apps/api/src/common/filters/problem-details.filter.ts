import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

function messageOf(body: unknown): string {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object' && 'message' in body) {
    const m = (body as { message: unknown }).message;
    return Array.isArray(m) ? m.join('; ') : String(m);
  }
  return 'Unexpected error';
}

// O Terminus lança 503 com o resultado do health check no corpo: { status, info, error, details }.
function isHealthResult(body: unknown): body is Record<string, unknown> {
  return (
    typeof body === 'object' &&
    body !== null &&
    'status' in body &&
    'details' in body
  );
}

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request & { id?: string }>();
    const res = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const body =
      exception instanceof HttpException ? exception.getResponse() : undefined;

    // Health check que falhou: devolve o corpo do Terminus, que diz QUAL indicador caiu.
    if (isHealthResult(body)) {
      res.status(status).json(body);
      return;
    }
    // Erro 5xx é defeito nosso: sem este log ele some (o cliente só vê "Unexpected error").
    if (status >= 500) this.logger.error(exception);

    res
      .status(status)
      .type('application/problem+json')
      .json({
        type: 'about:blank',
        title: HttpStatus[status] ?? 'Error',
        status,
        detail: messageOf(body),
        instance: req.originalUrl, //req.url perde o prefixo /api (testado).
        requestId: req.id,
      });
  }
}
