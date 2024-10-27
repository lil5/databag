import {StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

export const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  inputIcon: {
    backgroundColor: 'transparent',
  },
  full: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: 600,
    maxWidth: '80%',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    gap: 8,
  },
  remove: {
    backgroundColor: Colors.danger,
  },
  surface: {
    padding: 16,
  },
  close: {
    paddingTop: 8,
  },
  settings: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalLabel: {
    fontSize: 20,
  },
  modalClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  modalControls: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
  },
  modalDescription: {
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    paddingTop: 8,
  },
  image: {
    position: 'relative',
    width: '90%',
    maxWidth: 250,
    marginTop: 16,
    marginBottom: 8,
  },
  logoSet: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 8,
    width: null,
    height: null,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  logoUnset: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 8,
    width: null,
    height: null,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  editDetails: {
    borderBottomLeftRadius: 8,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 16,
  },
  editDetailsLabel: {
    fontSize: 16,
    color: Colors.primary,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  editBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editLogo: {
    fontSize: 16,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12,
    color: Colors.primary,
  },
  editBorder: {
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
  },
  divider: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 12,
  },
  nameSet: {
    fontSize: 24,
    width: '100%',
    paddingLeft: 32,
    paddingRight: 72,
  },
  nameUnset: {
    fontSize: 24,
    width: '100%',
    paddingLeft: 32,
    paddingRight: 32,
    fontStyle: 'italic',
  },
  options: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 16,
  },
  option: {
    fontSize: 12,
    color: Colors.primary,
  },
  attributes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '100%',
    paddingTop: 12,
  },
  attribute: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 32,
    paddingRight: 32,
  },
  icon: {
    flexShrink: 0,
    width: 32,
    display: 'flex',
    justifyContent: 'flex-begin',
    height: '100%',
    backgroundColor: 'transparent',
  },
  modalOption: {
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  label: {
    fontSize: 16,
  },
  smallLabel: {
    wordBreak: 'break-all',
  },
  labelUnset: {
    fontSize: 16,
    fontStyle: 'italic',
    flexGrow: 1,
  },
  labelSet: {
    fontSize: 16,
    flexGrow: 1,
  },
  allControl: {
    flexShrink: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  control: {
    flexShrink: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioIcon: {
    flexShrink: 0,
    width: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  radioControl: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  controlIcon: {
    flexShrink: 0,
    width: 32,
  },
  controlLabel: {
    fontSize: 16,
    color: Colors.primary,
  },
  dangerLabel: {
    fontSize: 16,
    color: Colors.danger,
  },
  controlSwitch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  input: {
    width: '100%',
    marginTop: 16,
  },
  secretImage: {
    width: 192,
    height: 192,
    alignSelf: 'center',
    borderRadius: 8,
    margin: 16,
  },
  secretText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  secret: {
    paddingRight: 16,
  },
  secretIcon: {
    marginLeft: 8,
  },
  authMessage: {
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  authMessageText: {
    fontSize: 16,
    color: Colors.danger,
  },
  radio: {
    borderRadius: 32,
  },
});
