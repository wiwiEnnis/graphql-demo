import * as yup from 'yup';

export interface MarvinResponse<T> {
  data: T;
}

class MarvinRequest<T> {
  private validationSchema: Pick<yup.Schema<T>, 'validate'> | null = null;
  private coercingSchema: Pick<yup.Schema<T>, 'cast'> | null = null;

  constructor(private request: () => Promise<MarvinResponse<T>>) {}

  public validate(schema: yup.Schema<T>) {
    this.validationSchema = schema;
    return this;
  }
  public coerce(schema: yup.Schema<T>) {
    this.coercingSchema = schema;
    return this;
  }
  public execute() {
    return (
      this.request()
        // validation
        .then(async r => {
          if (this.validationSchema) {
            try {
              const isValid = await this.validationSchema.validate(r.data, {
                strict: true,
              });
              console.log(isValid);
            } catch (err) {
              console.warn(err);
            }
          }

          return r;
        })

        // coercing
        .then(async r => {
          if (this.coercingSchema) {
            try {
              const coerced = this.coercingSchema.cast(r.data);
              console.log(coerced);
              r.data = coerced;
            } catch (err) {
              console.warn(err);
            }
          }

          return r;
        })
    );
  }
}

class MarvinClient {
  public query<T extends MarvinResponse<any>>(request: () => Promise<T>) {
    return new MarvinRequest<T['data']>(request);
  }
}

export default new MarvinClient();
