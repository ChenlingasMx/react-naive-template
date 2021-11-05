import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, SafeAreaView, StyleSheet, StatusBar, Pressable} from 'react-native';
import {Flex, Icon} from '@uiw/react-native';
import {View, TextField, Button} from 'react-native-ui-lib';
import Global from '../../global';
import conf from '../../config';

class SigninScreen extends Component {
  state = {
    hostType: '',
  };

  async componentDidMount() {
    const {navigation} = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    this._getHostType();
  }
  goToOptions = () => {
    this.props.navigation.navigate('DevOptions');
  };
  onChangeUserName = text => this.props.updateForm({username: text});
  onChangePassWord = text => this.props.updateForm({password: text});
  onSubmit = () => this.props.login();

  _getHostType = async () => {
    if (conf.production) {
      const productionOptions = conf.hosts.find(itm => itm.type === 'production');
      await AsyncStorage.setItem('apihost', JSON.stringify(productionOptions));
    } else {
      const host = await AsyncStorage.getItem('apihost');
      this.setState({
        hostType: JSON.parse(host).type,
      });
    }
  };

  render() {
    const {formData, loading} = this.props;
    return (
      <SafeAreaView style={styles.block}>
        <StatusBar barStyle="light-content" />
        {!conf.production && (
          <Flex justify="end">
            <Pressable style={styles.setting} onPress={this.goToOptions}>
              <Icon bordered={false} name="setting" fill="#5847FF" />
            </Pressable>
          </Flex>
        )}
        <ScrollView>
          <View flex paddingH-25 paddingT-120>
            <TextField
              value={formData.username}
              onChangeText={this.onChangeUserName}
              text60
              placeholder="username"
              grey10
              validate="required"
              errorMessage="请输入用户名"
              showCharacterCounter
              maxLength={10}
            />
            <TextField
              value={formData.password}
              onChangeText={this.onChangePassWord}
              text60
              placeholder="password"
              secureTextEntry
              grey10
              validate="required"
              errorMessage="请输入密码"
              // underlineColor={{focus: Colors.purple50, error: Colors.orange60}}
            />
            <Button label="登录" fullWidth disabled={loading?.login} onPress={this.onSubmit} marginT-20 />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(
  ({loading, global, users}) => ({
    loading: loading.effects.users,
    token: global.token,
    formData: users.formData,
  }),
  ({users}) => ({
    login: users.login,
    update: users.update,
    updateForm: users.updateForm,
  }),
)(SigninScreen);

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff',
  },
  setting: {
    marginRight: 16,
  },
});
