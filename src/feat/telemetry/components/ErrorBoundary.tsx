import React, { ErrorInfo } from 'react'
import { TelemetryService } from '../services/telemetry.service'

export interface ErrorBoundaryProps {
  regionName: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({ ...this.state, error: error, errorInfo: errorInfo })

    // send error to server
    void TelemetryService.recordClientError({
      ErrorRegion: this.props.regionName,
      StackTrace: error.stack || '',
      Message: error.message,
      ComponentStack: errorInfo.componentStack,
    })
    console.log(`errorInfo `, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <h3>Error Message: {this.state.error?.message}</h3>
          <h3 style={{ whiteSpace: 'pre' }}>Error Stack: {this.state.error?.stack}</h3>
          <h3 style={{ whiteSpace: 'pre' }}>
            React Component Stack: {this.state.errorInfo?.componentStack}
          </h3>
        </div>
      )
    }

    return this.props.children
  }
}
