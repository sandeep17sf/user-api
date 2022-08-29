import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  logger(msg: string) {
    console.log(msg);
  }
  handleOrigin(referer: string) {
    const originList = process.env.ALLOWED_ORIGINS?.split(', ') || [];

    let allowed = true;
    //  check origin
    if (referer) {
      const origin = new URL(referer).origin;
      if (!originList.includes(origin)) {
        allowed = false;
      }
    }
    return allowed;
  }
  async handle(context: RequestContext) {
    let startTime = new Date().toLocaleTimeString();

    const {request, response } = context;

    const isAllowed = this.handleOrigin(context.request.get('referer') || '');

    console.time('Completed In');
    const ip = request.headers['x-forwarded-for'] || request.ip;
    const userAgent = request.headers['user-agent'];
    console.log(request.get('Referrer'), process.env.ALLOWED_ORIGIN);
    this.logger(
      `${ip} ${request.method} ${startTime} ${request.originalUrl} ${userAgent} `,
    );

    try {
      if (isAllowed) {
        await super.handle(context);
      } else {
        response.status(404).send("Access denied for this origin");
      }
    } catch (error) {
      this.logger('Error at: ' + new Date().toLocaleTimeString());
    }
    console.timeEnd('Completed In');
  }
}
