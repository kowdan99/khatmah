import { Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
 
const MyReactNativeForm = () => (
   <Formik
     initialValues={{ email: '' }}
     onSubmit={values => console.log(values)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
         />
         {/* <Button title="Submit" /> */}
       </View>
     )}
   </Formik>
 );

 export default MyReactNativeForm;