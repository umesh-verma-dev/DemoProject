import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Card from '../../component/common/Card';
import InputElements from '../../component/common/InputField';
import {Icon, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import StringUtils from '../../utility/string';
import callSignUpApi from '../../context/actions/signup';
// import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Header} from '../../component';
import Toast from 'react-native-simple-toast';
import styles from './styles';

const reviewSchema = yup.object({
  email: yup
    .string()
    .required('email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      StringUtils.emailVailidation,
    ),
  name: yup.string().required('name is required').min(5),
  password: yup.string().required('Password is required').min(6),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
});
const SignUp = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  const login = () => {
    navigation.navigate('Login');
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
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              validationSchema={reviewSchema}
              onSubmit={async values => {
                let data = {
                  full_name: values.name,
                  email: values.email,
                  password: values.password,
                  confirm_password: values.confirm_password,
                };

                try {
                  const res = await callSignUpApi(data, dispatch);
                  if (res.success) {
                    Toast.show(JSON.stringify(res.message));
                    navigation.replace('Login');
                  } else if (!res.success) {
                    Toast.show(JSON.stringify(res.error.email));
                  } else {
                    alert('Somthing went wrong');
                  }
                } catch (err) {
                  console.log(err);
                }
              }}>
              {props => (
                <View style={{marginTop: '10%'}}>
                  <InputElements
                    onChangeText={props.handleChange('name')}
                    value={props.values.name}
                    onBlur={props.handleBlur('name')}
                    placeholder={StringUtils.namePlaceholder}
                    // leftIcon={
                    //   <MaterialIcons name="person" color="#517fa4" size={24} />
                    // }
                    errorStyle={{color: '#ff0000'}}
                    clearButtonMode="while-editing"
                    errorMessage={props.touched.name && props.errors.name}
                  />

                  <InputElements
                    onChangeText={props.handleChange('email')}
                    value={props.values.email}
                    onBlur={props.handleBlur('email')}
                    keyboardType="email-address"
                    placeholder={StringUtils.emailPlaceholder}
                    // leftIcon={
                    //     <AntDesignIcon name="mail" color="#517fa4" size={20}
                    //     />
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
                    errorStyle={{color: '#ff0000'}}
                    errorMessage={
                      props.touched.password && props.errors.password
                    }
                    clearButtonMode="while-editing"
                  />
                  <InputElements
                    onChangeText={props.handleChange('confirm_password')}
                    value={props.values.confirm_password}
                    onBlur={props.handleBlur('confirm_password')}
                    secureTextEntry={hidePassword}
                    placeholder="Confirm Password"
                    max={30}
                    // leftIcon={
                    //   <Icon name="lock1" type="antdesign" color="#517fa4" />
                    // }
                    errorStyle={{color: '#ff0000'}}
                    errorMessage={
                      props.touched.confirm_password &&
                      props.errors.confirm_password
                    }
                    clearButtonMode="while-editing"
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      title={StringUtils.titleSignButton}
                      disabled={
                        props.errors.name ||
                        props.errors.email ||
                        props.errors.password ||
                        props.errors.confirm_password
                          ? true
                          : false
                      }
                      buttonStyle={{
                        borderRadius: 20,
                      }}
                      onPress={() => props.handleSubmit()}
                    />
                  </View>
                  <View style={styles.loginContainer}>
                    <Text>Already have an account?</Text>
                    <Text style={styles.loginTxt} onPress={() => login()}>
                      Login
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

export default SignUp;
