import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import Card from '../../component/common/Card';
import InputElements from '../../component/common/InputField';
import {Icon, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import StringUtils from '../../utility/string';
import callLoginApi from '../../context/actions/login';
import {Header} from '../../component';
import styles from './styles';
const reviewSchema = yup.object({
  email: yup
    .string()
    .required()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      StringUtils.emailVailidation,
    ),
  password: yup.string().required().min(6),
});
const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const signUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={{flex: 1}}>
      <Header onPress={() => navigation.goBack()} />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: 500,
          })}
          style={styles.screen}>
          <Card style={styles.authContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={reviewSchema}
              onSubmit={async values => {
                let data = {
                  email: values.email,
                  password: values.password,
                };

                try {
                  const res = await callLoginApi(data, dispatch, navigation);
                  if (res.success) {
                    Toast.show('Logged in successfully');
                    // alert('On Login' + JSON.stringify(res));
                    navigation.reset({
                      routes: [{name: 'Home'}],
                    });
                  }
                } catch (err) {
                  console.log(err);
                }
              }}>
              {props => (
                <View style={{marginTop: '10%'}}>
                  <InputElements
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                    onBlur={props.handleBlur('email')}
                    keyboardType="email-address"
                    placeholder={StringUtils.emailPlaceholder}
                    // leftIcon={
                    //   <AntDesignIcon name="mail" color="#517fa4" size={20} />
                    // }
                    errorStyle={{color: '#ff0000'}}
                    clearButtonMode="while-editing"
                    errorMessage={props.touched.email && props.errors.email}
                  />

                  <InputElements
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    onBlur={props.handleBlur('password')}
                    secureTextEntry={hidePassword}
                    placeholder="Enter Password"
                    max={30}
                    // leftIcon={
                    //   <Icon name="lock1" type="antdesign" color="#517fa4" />
                    // }
                    // rightIcon={
                    //   <TouchableOpacity
                    //     activeOpacity={0.8}
                    //     style={styles.visibilityBtn}
                    //     disabled={props.errors.password ? true : false}
                    //     onPress={managePasswordVisibility}>
                    //     <Icon
                    //       name={hidePassword ? 'visibility-off' : 'visibility'}
                    //       type="material-icons"
                    //       size={25}
                    //       color="gray"
                    //     />
                    //   </TouchableOpacity>
                    // }
                    errorStyle={{color: '#ff0000'}}
                    errorMessage={
                      props.touched.password && props.errors.password
                    }
                    clearButtonMode="while-editing"
                  />

                  <View style={styles.buttonContainer}>
                    <Button
                      title={StringUtils.titleLoginButton}
                      disabled={
                        props.errors.password || props.errors.email
                          ? true
                          : false
                      }
                      buttonStyle={{
                        borderRadius: 20,
                      }}
                      onPress={() => props.handleSubmit()}
                    />
                  </View>

                  <View style={styles.signupContainer}>
                    <Text>Don't have an account?</Text>
                    <Text style={styles.signUpTxt} onPress={() => signUp()}>
                      Sign Up
                    </Text>
                  </View>
                </View>
              )}
            </Formik>
          </Card>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default Login;
