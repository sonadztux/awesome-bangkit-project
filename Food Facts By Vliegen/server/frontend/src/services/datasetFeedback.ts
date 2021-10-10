import { createRequestForwarder } from '../utils/createRequestForwarder'

const DATABASE_FEEDBACK_BASE_URL = process.env.DATABASE_FEEDBACK_BASE_URL

export const postStoreImage = createRequestForwarder(DATABASE_FEEDBACK_BASE_URL + '/store-image')
