import React, {useState, useCallback} from 'react';
import {SafeAreaView, View, useColorScheme} from 'react-native';
import {styles} from './Session.styled';
import {IconButton, Surface, Text, Icon} from 'react-native-paper';
import {Settings} from '../settings/Settings';
import {Contacts} from '../contacts/Contacts';
import {Content} from '../content/Content';
import {Registry} from '../registry/Registry';
import {Profile, ContactParams} from '../profile/Profile';
import {Details} from '../details/Details';
import {Identity} from '../identity/Identity';
import {Conversation} from '../conversation/Conversation';
import {useSession} from './useSession.hook';
import {TransitionPresets} from '@react-navigation/stack';
import {Focus} from 'databag-client-sdk';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../constants/Colors';

const SettingsDrawer = createDrawerNavigator();
const ContactsDrawer = createDrawerNavigator();
const RegistryDrawer = createDrawerNavigator();
const ProfileDrawer = createDrawerNavigator();
const DetailsDrawer = createDrawerNavigator();

const ContactStack = createStackNavigator();
const ContentStack = createStackNavigator();

export function Session() {
  const {state} = useSession();
  const scheme = useColorScheme();
  const [tab, setTab] = useState('content');

  const sessionNav = {strings: state.strings};
  const showContent = {display: tab === 'content' ? 'flex' : 'none'};
  const showContact = {display: tab === 'contacts' ? 'flex' : 'none'};
  const showSettings = {display: tab === 'settings' ? 'flex' : 'none'};

  return (
    <View style={styles.session}>
      {state.layout !== 'large' && (
        <Surface elevation={2}>
          <SafeAreaView style={styles.full}>
            <View style={styles.screen}>
              <View
                style={{
                  ...styles.body,
                  ...showContent,
                }}>
                <ContentTab scheme={scheme} />
              </View>
              <View
                style={{
                  ...styles.body,
                  ...showContact,
                }}>
                <ContactTab scheme={scheme} />
              </View>
              <View
                style={{
                  ...styles.body,
                  ...showSettings,
                }}>
                <Surface elevation={0}>
                  <Settings showLogout={true} />
                </Surface>
              </View>
              <View style={styles.tabs}>
                {tab === 'content' && (
                  <IconButton
                    style={styles.activeTab}
                    mode="contained"
                    icon={'comment-multiple'}
                    size={28}
                    onPress={() => {
                      setTab('content');
                    }}
                  />
                )}
                {tab !== 'content' && (
                  <IconButton
                    style={styles.idleTab}
                    mode="contained"
                    icon={'comment-multiple-outline'}
                    size={28}
                    onPress={() => {
                      setTab('content');
                    }}
                  />
                )}
                {tab === 'contacts' && (
                  <IconButton
                    style={styles.activeTab}
                    mode="contained"
                    icon={'contacts'}
                    size={28}
                    onPress={() => {
                      setTab('contacts');
                    }}
                  />
                )}
                {tab !== 'contacts' && (
                  <IconButton
                    style={styles.idleTab}
                    mode="contained"
                    icon={'contacts-outline'}
                    size={28}
                    onPress={() => {
                      setTab('contacts');
                    }}
                  />
                )}
                {tab === 'settings' && (
                  <IconButton
                    style={styles.activeTab}
                    mode="contained"
                    icon={'cog'}
                    size={28}
                    onPress={() => {
                      setTab('settings');
                    }}
                  />
                )}
                {tab !== 'settings' && (
                  <IconButton
                    style={styles.idleTab}
                    mode="contained"
                    icon={'cog-outline'}
                    size={28}
                    onPress={() => {
                      setTab('settings');
                    }}
                  />
                )}
              </View>
            </View>
            { state.disconnected && (
              <View style={styles.alert}>
                <Surface elevation={5} style={styles.alertArea}>
                  <Icon color={Colors.offsync} size={20} source="alert-circle-outline" />
                  <Text style={styles.alertLabel}>{ state.strings.disconnected }</Text>
                </Surface>
              </View>
            )}
          </SafeAreaView>
        </Surface>
      )}
      {state.layout === 'large' && (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <View style={styles.container}>
            <DetailsScreen nav={sessionNav} />
          </View>
        </NavigationContainer>
      )}
    </View>
  );
}

function ContentTab({scheme}: {scheme: string}) {
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ContentStack.Navigator initialRouteName="contacts" screenOptions={{headerShown: false}}>
        <ContentStack.Screen name="content" options={{headerBackTitleVisible: false}}>
          {props => (
            <Content openConversation={()=>props.navigation.navigate('conversation')} />
          )}
        </ContentStack.Screen>
        <ContentStack.Screen name="conversation" 
          options={{
            headerBackTitleVisible: false,
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}>
          {props => (
            <Conversation close={()=>props.navigation.goBack()} />
          )}
        </ContentStack.Screen>
      </ContentStack.Navigator>
    </NavigationContainer>
  );
}

function ContactTab({scheme}: {scheme: string}) {
  const [contactParams, setContactParams] = useState({
    guid: '',
  } as ContactParams);

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ContactStack.Navigator initialRouteName="contacts" screenOptions={{headerShown: false}}>
        <ContactStack.Screen name="contacts" options={{headerBackTitleVisible: false}}>
          {props => (
            <Contacts
              openRegistry={() => {
                props.navigation.navigate('registry');
              }}
              openContact={(params: ContactParams) => {
                setContactParams(params);
                props.navigation.navigate('profile');
              }}
            />
          )}
        </ContactStack.Screen>
        <ContactStack.Screen
          name="registry"
          options={{
            headerBackTitleVisible: false,
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}>
          {props => (
            <Registry
              close={props.navigation.goBack}
              openContact={(params: ContactParams) => {
                setContactParams(params);
                props.navigation.navigate('profile');
              }}
            />
          )}
        </ContactStack.Screen>
        <ContactStack.Screen
          name="profile"
          options={{
            headerBackTitleVisible: false,
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}>
          {props => <Profile close={props.navigation.goBack} params={contactParams} />}
        </ContactStack.Screen>
      </ContactStack.Navigator>
    </NavigationContainer>
  );
}

function DetailsScreen({nav}) {
  return (
    <DetailsDrawer.Navigator
      id="DetailsDrawer"
      drawerContent={Details}
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
      }}>
      <DetailsDrawer.Screen name="details">{({navigation}) => <ProfileScreen nav={{...nav, details: navigation}} />}</DetailsDrawer.Screen>
    </DetailsDrawer.Navigator>
  );
}

function ProfileScreen({nav}) {
  const [contactParams, setContactParams] = useState({
    guid: '',
  } as ContactParams);
  const openContact = (params: ContactParams, open: () => {}) => {
    setContactParams(params);
    open();
  };

  const ProfileComponent = useCallback(() => <Profile params={contactParams} />, [contactParams]);

  return (
    <ProfileDrawer.Navigator
      id="ProfileDrawer"
      drawerContent={ProfileComponent}
      screenOptions={{
        drawerStyle: {width: 300},
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
      }}>
      <ProfileDrawer.Screen name="registry">{({navigation}) => <RegistryScreen nav={{...nav, profile: navigation, openContact}} />}</ProfileDrawer.Screen>
    </ProfileDrawer.Navigator>
  );
}

function RegistryScreen({nav}) {
  const RegistryComponent = useCallback(
    () => (
      <Surface elevation={1}>
        <Registry
          openContact={(params: ContactParams) => {
            nav.openContact(params, nav.profile.openDrawer);
          }}
        />
      </Surface>
    ),
    [nav],
  );

  return (
    <RegistryDrawer.Navigator
      id="RegistryDrawer"
      drawerContent={RegistryComponent}
      screenOptions={{
        drawerStyle: {width: 350},
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
      }}>
      <RegistryDrawer.Screen name="contacts">{({navigation}) => <ContactsScreen nav={{...nav, registry: navigation}} />}</RegistryDrawer.Screen>
    </RegistryDrawer.Navigator>
  );
}

function ContactsScreen({nav}) {
  const ContactsComponent = useCallback(
    () => (
      <Surface elevation={1}>
        <Contacts
          openRegistry={nav.registry.openDrawer}
          openContact={(params: ContactParams) => {
            nav.openContact(params, nav.profile.openDrawer);
          }}
        />
      </Surface>
    ),
    [nav],
  );

  return (
    <ContactsDrawer.Navigator
      id="ContactsDrawer"
      drawerContent={ContactsComponent}
      screenOptions={{
        drawerStyle: {width: 400},
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
      }}>
      <ContactsDrawer.Screen name="settings">{({navigation}) => <SettingsScreen nav={{...nav, contacts: navigation}} />}</ContactsDrawer.Screen>
    </ContactsDrawer.Navigator>
  );
}

function SettingsScreen({nav}) {
  const SettingsComponent = useCallback(
    () => (
      <Surface elevation={1}>
        <Settings />
      </Surface>
    ),
    [],
  );

  return (
    <SettingsDrawer.Navigator
      id="SettingsDrawer"
      drawerContent={SettingsComponent}
      screenOptions={{
        drawerStyle: {width: '50%'},
        drawerPosition: 'right',
        drawerType: 'front',
        headerShown: false,
      }}>
      <SettingsDrawer.Screen name="home">{({navigation}) => <HomeScreen nav={{...nav, settings: navigation}} />}</SettingsDrawer.Screen>
    </SettingsDrawer.Navigator>
  );
}

function HomeScreen({nav}) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.frame}>
      <View style={styles.left}>
        <Surface style={styles.identity} elevation={2} mode="flat">
          <Identity openSettings={nav.settings.openDrawer} openContacts={nav.contacts.openDrawer} />
        </Surface>
        <Surface style={styles.channels} elevation={1} mode="flat">
          <Content openConversation={()=>setFocus(true)} />
        </Surface>
      </View>
      <View style={styles.right}>
        {focus && <Conversation close={()=>setFocus(false)} />}
        {!focus && <Text>FOCUS NOT SET</Text>}
      </View>
    </View>
  );
}
