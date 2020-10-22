import React from 'react';
import { Text } from 'react-native';

import {
  saveJWT,
  saveUser,
} from '~/utils/api';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      errorMessage: '',
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { errorMessage: error.message, hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
    
    // alert(error.message)
    // Clear stored User and JWT as it can be throwing an error due to it being corrupt
    if (process.env.NODE_ENV !== 'development') {
      saveUser(null);
      saveJWT(null);
    }
    // }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<View style={{marginTop: 80, marginLeft: 40}}>
          <Text>Something went wrong... Please close and reopen the app.</Text>
          <Text>{errorMessage}</Text>
        </View>)
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
