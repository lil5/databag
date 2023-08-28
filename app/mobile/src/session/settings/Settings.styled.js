import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Colors.screenBase,
  },
  label: {
    color: Colors.text,
    padding: 4,
    fontFamily: 'Roboto',
  },
  radio: {
    marginLeft: 34,
    display: 'flex',
    flexDirection: 'row',
  },
  idleRadioCircle: {
    borderWidth: 1,
    borderColor: Colors.activeBorder,
    borderRadius: 8,
    width: 16,
    height: 16,
  },
  activeRadioCircle: {
    borderWidth: 1,
    borderColor: Colors.activeBorder,
    backgroundColor: Colors.activeFill,
    borderRadius: 8,
    width: 16,
    height: 16,
  },
  radioLabel: {
    color: Colors.linkText,
    paddingLeft: 8,
    fontFamily: 'Roboto',
  },
  group: {
    backgroundColor: Colors.areaBase,
    width: '100%',
    borderRadius: 8,
    marginBottom: 8,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.screenBase,
  },
  entry: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    height: 40,
  },
  icon: {
    flex: 2,
    alignItems: 'center',
  },
  option: {
    flex: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionControl: {
    flex: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  control: {
    flex: 2,
    alignItems: 'center',
  },
  labelText: {
    fontSize: 14,
    paddingRight: 8,
    color: Colors.descriptionText,
    fontFamily: 'Roboto',
  },
  optionText: {
    fontSize: 16,
    paddingRight: 8,
    color: Colors.text,
    fontFamily: 'Roboto',
  },
  optionLink: {
    fontSize: 16,
    paddingRight: 8,
    color: Colors.linkText,
    fontFamily: 'Roboto',
  },
  dangerLink: {
    fontSize: 16,
    paddingRight: 8,
    color: Colors.dangerText,
    fontFamily: 'Roboto',
  },
  track: {
    false: Colors.disabledIndicator,
    true: Colors.enabledIndicator,
  },
  notifications: {
    transform: [{ scaleX: .6 }, { scaleY: .6 }],
  },

  modalOverlay: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.modalOverlay,
  },
  modalContainer: {
    backgroundColor: Colors.modalBase,
    width: '80%',
    maxWidth: 400,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 18,
    paddingBottom: 16,
    paddingTop: 16,
    color: Colors.text,
    fontFamily: 'Roboto',
  },
  modalClose: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: Colors.descriptionText,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  modalInput: {
    width: '100%',
    paddingRight: 32,
    paddingLeft: 32,
  },
  inputText: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: Colors.inputBase,
  },
  enabledButton: {
    marginTop: 32,
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 4,
    backgroundColor: Colors.primaryButton,
  },
  enabledButtonText: {
    color: Colors.primaryButtonText,
    fontFamily: 'Roboto',
  },
  disabledButton: {
    marginTop: 32,
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 4,
    backgroundColor: Colors.disabledButton,
  },
  disabledButtonText: {
    color: Colors.disabledButtonText,
    fontFamily: 'Roboto',
  },
});

