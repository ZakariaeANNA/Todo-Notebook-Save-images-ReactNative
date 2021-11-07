import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNav from './AuthNavigator';
import TopNav from './TopNavigator';
import AuthLoadingScreen from '../Components/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TopNav,
      Auth: AuthNav,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);