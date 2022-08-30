import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  logger(msg: string) {
    console.log(msg);
  }
  checkReferOrigin(referer: string): boolean {
    const originList = process.env.ALLOWED_ORIGINS?.split(',') || [];

    if (!referer) {
      // no origin found
      // allow when no origin
      return true;
    }

    const origin = new URL(referer).origin;
    if (!originList.includes(origin)) {
      return true;
    }

    return false;
  }
  async handle(context: RequestContext) {
    let startTime = new Date().toLocaleTimeString();

    const {request, response} = context;

    const isAllowed = this.checkReferOrigin(request.get('referer') || '');
    if (!isAllowed) {
      
      response.status(403).send('Access denied for this origin');
      return;
    }

    console.time('Completed In');
    const ip = request.headers['x-forwarded-for'] || request.ip;
    const userAgent = request.headers['user-agent'];
    this.logger(
      `${ip} ${request.method} ${startTime} ${request.originalUrl} ${userAgent} `,
    );

    try {
      await super.handle(context);
    } catch (error) {
      this.logger('Error at: ' + new Date().toLocaleTimeString());
    }
    console.timeEnd('Completed In');
  }
}
