import React, { useState } from 'react'
import { useDetails } from './useDetails.hook'
import classes from './Details.module.css'
import { IconUserCog, IconEyeOff, IconAlertHexagon, IconMessageX, IconLogout2, IconHome, IconServer, IconShield, IconShieldOff, IconCalendarClock, IconExclamationCircle, IconX, IconEdit, IconDeviceFloppy, IconArrowBack, IconLabel } from '@tabler/icons-react'
import { Divider, Text, Textarea, Image, TextInput, ActionIcon } from '@mantine/core'
import { Card } from '../card/Card';

export function Details({ close }: { close?: () => void }) {
  const { state, actions } = useDetails()

  const undo = () => {
    actions.undoSubject();
  }

  const save = () => {
    console.log('save subject');
  }

  const cards = state.channelCards.map((card, index) => (
      <Card className={classes.card} key={index} imageUrl={card.imageUrl} name={card.name} placeHolder={state.strings.name}
        handle={card.handle} node={card.node}/>
  ))

  return (
    <div className={classes.details}>
      <div className={classes.header}>
        {close && <IconX className={classes.match} />}
        <Text className={classes.label}>{ state.strings.details }</Text>    
        {close && <IconX className={classes.close} onClick={close} />}
      </div>
      { state.access && (
        <div className={classes.body}>
          <div className={classes.attributes}>
            { state.host && (
              <div className={classes.subject}>
                <div className={classes.subjectLabel}>
                  <TextInput size="lg" placeholder={state.strings.subject} value={state.editSubject} onChange={(event) => actions.setEditSubject(event.currentTarget.value)}
                    leftSectionPointerEvents="none" leftSection={<IconLabel />}
                    rightSectionPointerEvents="all" rightSectionWidth={64} rightSection={
                      <div className={classes.subjectControls}>
                        { state.editSubject != state.subject && (
                          <ActionIcon key="undo" variant="subtle" onClick={undo}><IconArrowBack /></ActionIcon>
                        )}
                        { state.editSubject != state.subject && (
                          <ActionIcon key="save" variant="subtle" onClick={save}><IconDeviceFloppy /></ActionIcon>
                        )}
                      </div>
                    } />
                </div>
              </div>
            )}
            { !state.host && state.subject && (
              <div className={classes.attribute}>
                <IconLabel size={28} className={classes.subjectValue} />
                <Text className={classes.subjectValue}>{ state.subject }</Text>
              </div>
            )}
            { !state.host && !state.subject && (
              <div className={classes.attribute}>
                <IconLabel size={28} className={classes.subjectPlaceholder} />
                <Text className={classes.subjectPlaceholder}>{ state.strings.subject }</Text>
              </div>
            )}
            <div className={classes.attribute}>
              <IconCalendarClock size={20}/>
              <Text className={classes.attributeValue}>{ state.created }</Text>
            </div>
            { state.sealed && (
              <div className={classes.attribute}>
                <IconShield size={20} />
                <Text className={classes.attributeValue}>{ state.strings.sealed }</Text>
              </div>
            )}
            { !state.sealed && (
              <div className={classes.attribute}>
                <IconShieldOff size={20} />
                <Text className={classes.attributeValue}>{ state.strings.notSealed }</Text>
              </div>
            )}
            { state.host && (
              <div className={classes.attribute}>
                <IconHome size={20} />
                <Text className={classes.attributeValue}>{ state.strings.channelHost }</Text>
              </div>
            )}
            { !state.host && (
              <div className={classes.attribute}>
                <IconServer size={20} />
                <Text className={classes.attributeValue}>{ state.strings.channelGuest }</Text>
              </div>
            )}
          </div>
          <Divider className={classes.divider} />
          { !state.host && (
            <div className={classes.actions}>
              <div className={classes.action}>
                <ActionIcon variant="subtle" size="lg">
                  <IconLogout2 size="lg" />
                </ActionIcon>
                <Text className={classes.actionLabel}>{state.strings.leave}</Text>
              </div> 
              <div className={classes.action}>
                <ActionIcon variant="subtle" size="lg">
                  <IconEyeOff size="lg" />
                </ActionIcon>
                <Text className={classes.actionLabel}>{state.strings.block}</Text>
              </div>
              <div className={classes.action}>
                <ActionIcon variant="subtle" size="lg">
                  <IconAlertHexagon size="lg" />
                </ActionIcon>
                <Text className={classes.actionLabel}>{state.strings.report}</Text>
              </div> 
            </div>
          )}
          { state.host && (
            <div className={classes.actions}>
              <div className={classes.action}>
                <ActionIcon variant="subtle" size="lg" >
                  <IconMessageX size="lg" />
                </ActionIcon>
                <Text className={classes.actionLabel}>{state.strings.remove}</Text>
              </div> 
              <div className={classes.action}>
                <ActionIcon variant="subtle" size="lg" >
                  <IconUserCog size="lg" />
                </ActionIcon>
                <Text className={classes.actionLabel}>{state.strings.members}</Text>
              </div> 
            </div>
          )}
          <div className={classes.membership}>
            <Text className={classes.members}>{ state.strings.membership }</Text>
          </div>
          <Divider className={classes.divider} size="md" />
          <div className={classes.cards}>
            { state.hostCard && (
              <Card className={classes.card} imageUrl={state.hostCard.imageUrl} name={state.hostCard.name} placeHolder={state.strings.name}
                handle={state.hostCard.handle} node={state.hostCard.node} actions={[<IconHome key="host" size={20} />]} />
            )}
            { cards }
            { state.unknownContacts > 0 && (
              <Text className={classes.unknown}>{ state.strings.unknown }: {state.unknownContacts}</Text>
            )}
          </div>
        </div>
      )}
      { !state.access && (
        <div className={classes.disconnected}>
          <IconExclamationCircle />
          <Text>{ state.strings.syncError }</Text>          
        </div>
      )}
    </div>
  )
}
