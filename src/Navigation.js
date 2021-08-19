import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Section from './screens/Section';
import Upload from './screens/Upload';
import Play from './screens/Play';

const AppNavigator = createStackNavigator(
    {
        Section: {
            screen: Section,
            navigationOptions: {
                headerShown: false,
            }
        },

        Upload: {
            screen: Upload,
            navigationOptions: {
                headerShown: false,
            }
        },

        Play: {
            screen: Play,
            navigationOptions: {
                headerShown: false,
            }
        }
    },
    {
        initialRouteName: "Section"
    }
);

export default AppContainer = createAppContainer(AppNavigator);  
