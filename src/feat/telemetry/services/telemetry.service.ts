import { NotImplementedException } from '../../../common/exceptions/not-implemented.exception'
import { ClientError } from '../models/client-error.model'

export class TelemetryService {
  static recordClientError = async (error: ClientError) => {
    throw new NotImplementedException('Method')
  }
}
