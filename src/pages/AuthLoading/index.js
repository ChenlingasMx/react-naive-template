import React from 'react';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {Loader} from '@uiw/react-native';
import {Text, View} from 'react-native-ui-lib';
import Global from '../../global';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const {navigation, authToken} = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    authToken();
  }
  render() {
    const {token, loading, authState, children} = this.props;
    if (children && typeof children === 'function' && authState) {
      return children(token);
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View center flex>
          <Loader
            loading={loading}
            maskColor="transtion"
            vertical
            rounded={5}
            tip={
              <Text marginT-15 white>
                react-native-template
              </Text>
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  ({global, loading}) => ({
    token: global.token,
    authState: global.authState,
    loading: loading.effects.global.authToken,
  }),
  ({global}) => ({
    authToken: global.authToken,
  }),
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
});
