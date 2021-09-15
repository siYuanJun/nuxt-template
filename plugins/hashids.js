import Hashids from 'hashids'
import env from '../env'

export default ({ app, store }) => {
    app.hashids = new Hashids(env.API_BASE_SECRET)
}
