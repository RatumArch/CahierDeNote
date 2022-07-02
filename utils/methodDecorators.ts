import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PrismaClient } from '@prisma/client'

export const validateHTTPMethod = (fn: (req: VercelRequest, res: VercelResponse) => Promise<void>, methodAllowed: string,  req: VercelRequest, res: VercelResponse) => {
    const method = methodAllowed.toLocaleUpperCase()
    if(req.method?.toUpperCase() ===method ) {
        return fn.call(this, req, res)
    }
    else {
        res.status(405).send(`ERROR : YOU MUST <strong> ${method}</strong>`)
    }
}
export const _get = (fn: (req: VercelRequest, res: VercelResponse) => any, req: VercelRequest, res: VercelResponse) => {
    validateHTTPMethod(fn, 'get', req, res)
}
export const _post = (fn: (req:VercelRequest, res: VercelResponse) => any, req: VercelRequest, res: VercelResponse) => {
    validateHTTPMethod(fn, 'post', req, res)
}
export const _update = (fn: (req:VercelRequest, res: VercelResponse) => any, req: VercelRequest, res: VercelResponse) => {
    validateHTTPMethod(fn, 'update', req, res)
}
