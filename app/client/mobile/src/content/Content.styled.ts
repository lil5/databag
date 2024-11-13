import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    height: 1,
  },
  bar: {
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
    fontSize: 16,
  },
  indicator: {
    borderRightWidth: 2,
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 8,
    paddingLeft: 8,
    width: '100%',
    zIndex: 1,
  },
  sort: {
    borderRadius: 4,
  },
  divider: {
    width: '100%',
    height: 2,
  },
  modalDivider: {
    width: '100%',
    height: 1,
  },
  inputSurface: {
    flexGrow: 1,
    height: 40,
    marginRight: 8,
    marginLeft: 4,
    display: 'flex',
  },
  input: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    height: 40,
    maxHeight: 40,
    borderRadius: 8,
    fontSize: 14,
  },
  inputUnderline: {
    display: 'none',
  },
  icon: {
    backgroundColor: 'transparent',
  },
  none: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneLabel: {
    fontSize: 20,
    color: Colors.placeholder,
  },
  channels: {
    width: '100%',
  },
  channel: {
    width: '100%',
    height: 48,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    borderBottomWidth: 1,
  },
  unread: {
    borderRightWidth: 2,
    borderColor: Colors.unread,
    borderRadius: 8,
  },
  read: {},
  modal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  addSurface: {
    padding: 16,
    borderRadius: 4,
  },
  addContainer: {
    width: 500,
    maxWidth: '90%',
  },
  addHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  addClose: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
  },
  addLabel: {
    flexGrow: 1,
    fontSize: 18,
    paddingLeft: 4,
    paddingBottom: 8,
  },
  sealSwitch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
    flexGrow: 1,
  },
  memberSwitch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  addControls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  sealable: {
    flexGrow: 1,
    flexShrink: 1,
  },
  sealableContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
  cancel: {
    borderRadius: 8,
  },
  cancelLabel: {
    fontSize: 14,
    marginVertical: 0,
    paddingVertical: 6,
  },
  create: {
    borderRadius: 8,
  },
  createLabel: {
    fontSize: 14,
    marginVertical: 0,
    paddingVertical: 6,
  },
  members: {
    height: 200,
  },
  membersContainer: {},
  subjectInput: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    height: 40,
    maxHeight: 40,
    borderRadius: 8,
    fontSize: 14,
    borderBottomWidth: 0,
  },
  subjectContainer: {
    marginBottom: 8,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overscrollBehavior: 'none',
  },
  card: {
    width: '100%',
    height: 48,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    borderBottomWidth: 1,
  },
});
