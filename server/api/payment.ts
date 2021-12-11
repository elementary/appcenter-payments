import { IncomingMessage as HttpIncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

interface IncomingMessage extends HttpIncomingMessage {
  body: { data?: object }
}

const RDNN_SCHEMA = z
  .string()
  .max(255, {
    message: 'Project RDNN must be shorter than 255 characters'
  })
  .regex(/^(?:[a-z0-9-_]+\.){2,}(?:[a-z0-9-_]+)$/i, {
    message: 'Project RDNN is not in an RDNN format'
  })
  .nonempty({
    message: 'Project RDNN is required'
  })

const DATA_SCHEMA = z
  .object({
    key: z
      .string()
      .max(255, {
        message: 'Stripe account key must be shorter than 255 characters'
      })
      .regex(/^pk_[a-z0-9]+/i, {
        message: 'Stripe account key must start with pk_'
      })
      .nonempty({
        message: 'Stripe account key is required'
      }),
    token: z
      .string()
      .max(255, {
        message: 'Stripe token must be shorter than 255 characters'
      })
      .regex(/^tok_[a-z0-9]+/i, {
        message: 'Stripe token must start with tok_'
      })
      .nonempty({
        message: 'Stripe token is required'
      }),
    email: z
      .string()
      .email({
        message: 'Email must be a valid email address'
      })
      .optional(),
    amount: z.preprocess(
      Number,
      z
        .number()
        .int({
          message: 'Amount must be an integer'
        })
        .gte(100, {
          message: 'Amount must be more than 100'
        })
        .lte(100000000, {
          message: 'Amount must be less than 100000000'
        })
        .multipleOf(100, {
          message: 'Amount must be a multiple of 100 (a whole dollar amount)'
        })
    ),
    currency: z.enum(['USD']).default('USD')
  })
  .strict()

export const REQUEST_SCHEMA = z.intersection(
  z.object({ rdnn: RDNN_SCHEMA }),
  DATA_SCHEMA
)
export type RequestType = z.infer<typeof REQUEST_SCHEMA>

function parseRdnn (req: IncomingMessage): string {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`)
  const pathChunks = parsedUrl.pathname.split('/')
  const lastChunk = pathChunks[pathChunks.length - 1]

  return lastChunk == null ? '' : lastChunk
}

function parseBody (req: IncomingMessage): Object {
  return req.body.data == null ? {} : req.body.data
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  const rdnn = RDNN_SCHEMA.parse(parseRdnn(req))
  const data = DATA_SCHEMA.parse(parseBody(req))

  const payload = Object.assign({ rdnn }, data)

  console.log(payload)

  res.statusCode = 200
  res.end('Works!')
}
