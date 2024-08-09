import React from 'react'
import { useAccess } from './useAccess.hook'
import classes from './Access.module.css';
import { Select, Space, Title, Image, Button, PasswordInput, TextInput } from '@mantine/core';
import login from '../images/login.png';
import { IconLock, IconUser, IconSettings } from '@tabler/icons-react'

export function Access() {

  const { state, actions } = useAccess()

  const change = (ev) => {
    console.log(ev);
  }

  return (
    <div className={classes.split}>
      { (state.display === 'medium' || state.display === 'large') && (
        <div className={classes.left}>
          <Image className={classes.splash} src={login} fit="contain" />
        </div>
      )}
      { state.display != null && (
        <div className={classes.right}>
          { state.mode !== 'admin' && (
            <Button variant="transparent" className={classes.float} leftSection={<IconSettings size={28} />} onClick={() => actions.setMode('admin')} />
          )}
          { state.mode === 'admin' && (
            <Button variant="transparent" className={classes.float} leftSection={<IconUser size={28} />} onClick={() => actions.setMode('login')} />
          )}
          <Title order={1}>Databag</Title>
          <Title order={3}>{ state.strings.login }</Title>
          <Space h="md" />
          <TextInput className={classes.input} size="md" leftSectionPointerEvents="none" leftSection={<IconUser />} placeholder={ state.strings.username }
            onChange={(event) => actions.setUsername(event.currentTarget.value)} />
          <PasswordInput className={classes.input} size="md" leftSection={<IconLock />} placeholder={ state.strings.password }
            onChange={(event) => actions.setPassword(event.currentTarget.value)} />
          <Space h="md" />
          <Button variant="filled" className={classes.submit}>{ state.strings.login }</Button>
          <Button variant="subtle">{ state.strings.createAccount }</Button>
          <Space h="md" />
          <div className={classes.settings}>

    <Select
      label={ state.strings.theme }
      data={ state.themes }
      value={state.theme}
      onChange={(theme) => actions.setTheme(theme)}
    />

    <Select
      label={ state.strings.language }
      data={ state.languages }
      value={state.language}
      onChange={(language) => actions.setLanguage(language)}
    />

          </div>
        </div>
      )}
    </div>
  )
}
