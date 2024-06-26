import { useContext, useState, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import { SettingsContext } from 'context/SettingsContext';
import { getAvailable } from 'api/getAvailable';
import { useLocation, useNavigate } from "react-router-dom";

export function useLogin() {

  const [state, setState] = useState({
    username: '',
    password: '',
    available: false,
    availableSet: false,
    disabled: true,
    busy: false,
    strings: {} as Record<string,string>,
    menuStyle: {},
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const app = useContext(AppContext);
  const settings = useContext(SettingsContext);

  const updateState = (value) => {
    setState((s) => ({ ...s, ...value }));
  }

  const actions = {
    setUsername: (username) => {
      updateState({ username });
    },
    setPassword: (password) => {
      updateState({ password });
    },
    isDisabled: () => {
      if (state.username === '' || state.password === '') {
        return true
      }
      return false
    },
    onSettings: () => {
      navigate('/admin');
    },
    onLogin: async () => {
      if (!state.busy && state.username !== '' && state.password !== '') {
        updateState({ busy: true })
        try {
          await app.actions.login(state.username, state.password)
        }
        catch (err) {
          console.log(err);
          updateState({ busy: false })
          throw new Error('login failed: check your username and password');
        }
        updateState({ busy: false })
      }
    },
    onCreate: () => {
      navigate('/create');
    },
  };

  useEffect(() => {
    const count = async () => {
      try {
        const available = await getAvailable()
        updateState({ availableSet: true, available: available !== 0 })
      }
      catch(err) {
        console.log(err);
      }
    }
    count();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const { strings, menuStyle } = settings.state;
    updateState({ strings, menuStyle });
  }, [settings.state]);

  const access =  async (token) => {
    if (!state.busy) {
      updateState({ busy: true });
      try {
        await app.actions.access(token);
      }
      catch (err) {
        console.log(err);
        updateState({ busy: false });
        throw new Error('access failed: check your token');
      }
      updateState({ busy: false });
    }
  }
 
  useEffect(() => {
    let params = new URLSearchParams(search);
    let token = params.get("access");
    if (token) {
      access(token);
    }
    // eslint-disable-next-line
  }, [])

  return { state, actions };
}

