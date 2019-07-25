import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Avatar, Button, CircularProgress, Divider, Chip, FontIcon, ExpansionList, ExpansionPanel, Toolbar, IconSeparator } from 'react-md';
import { Card, CardTitle, CardText } from 'react-md';
import { List, ListItem } from 'react-md';
import { TabsContainer, Tabs, Tab } from 'react-md';
import { map, capitalize } from 'lodash';
import { Badge, Icon, Typography, Menu, Checkbox, Dropdown } from 'antd';
import {
  useWord, useDefination
} from '../../redux/hooks';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { toggleMappingDefinationToDictionary as reduxToggleMappingDefinationToDictionary } from '../../redux/actions';

import './word.scss'

const { Paragraph } = Typography;

export default function Word({ wordId }) {
  const { word } = useWord(wordId);

  if (!word || word.isFetching) {
    return  (
      <CircularProgress id="word-cuircular-progress" />
    );
  }

  return (
    <>
      <Card>
        <CardText>
          <h1 className="md-text-center">{ capitalize(word.name) }</h1>
        </CardText>
        <TabsContainer>
          <Tabs
            className="rivers-sticky-tabs"
            tabId="pos-tabs"
            inactiveTabClassName="md-text--secondary"
          >
            { word.explanations.map(explaination => (
            <Tab
              className="md-title"
              key={explaination.pos}
              label={explaination.pos}
              icon={<FontIcon>public</FontIcon>}
            >
              <Explaination explaination={explaination} />
            </Tab>
            ))}
          </Tabs>
        </TabsContainer>
      </Card>
    </>
  );
}

function Explaination({ explaination }) {
  return (
    <>
      <List>
        <IpaListItem
          audioUrl={explaination.ipaUK.audioUrl}
          primaryText={<span dangerouslySetInnerHTML={{ __html: `/${explaination.ipaUK.html}/` }}></span>}
          secondaryText="UK"
        />
        <IpaListItem
          audioUrl={explaination.ipaUS.audioUrl}
          primaryText={<span dangerouslySetInnerHTML={{ __html: `/${explaination.ipaUS.html}/` }}></span>}
          secondaryText="US"
        />
      </List>
      <Divider />
      { explaination.senses.map(sense => (
        <Sense
          key={sense.guideWord}
          sense={sense}
        />
      ))}
    </>
  );
}

function Sense({ sense }) {
  return (
    <>
      { sense.guideWord && (
        <CardTitle
          title={[
            <FontIcon className="rivers-guide-word-title__icon">label</FontIcon>,
            sense.guideWord,
          ]}
        />
      )}
      { sense.definations.map(definationId => (
        <Defination
          key={definationId}
          definationId={definationId}
        />
      ))}
    </>
  );
}

export function Defination({ definationId }) {
  const { defination } = useDefination(definationId);

  return (
    <>
      <CardText
        className="rivers-defination-text"
      >
        <div className="md-grid">
          <div className="md-cell md-cell--1">
          { defination.level && (
            <Chip
              className="rivers-defination-text__chip"
              label={defination.level}
              labelClassName="md-font-bold"
            />
          )}
          </div>
          <div className="md-cell md-cell--11 rivers-defination-text__title-block">
            <h4 className="md-font-bold">{ defination.text }</h4>
            <p className="md-text--theme-primary md-font-bold">{ defination.translate }</p>
            { defination.examples.map(example => (
            <>
              <p>{example.text}</p>
              <p className="md-text--theme-primary">{example.translate}</p>
            </>
          ))}
          </div>
        </div>
      </CardText>
    </>
  );
}

export function _Defination({ definationId }) {
  const { defination } = useDefination(definationId);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const dictionaries = useMappedState(
    state => map(state.dictionaries),
    [],
  );

  const dispatch = useDispatch();
  const toggleMappingDefinationToDictionary = useCallback(
    (definationId, dictionaryId) => dispatch(reduxToggleMappingDefinationToDictionary(definationId, dictionaryId)),
    [],
  );

  const menu = (
    <Menu onMouseLeave={() => setDropdownVisibility(false)}>
    { dictionaries.map(d => (
      <Menu.Item key={d.id}>
        <Checkbox
          checked={d.definations.includes(definationId)}
          onChange={() => toggleMappingDefinationToDictionary(definationId, d.id)}
        >
        {d.name}
        </Checkbox>
      </Menu.Item>
    ))}
    </Menu>
  )

  return (
    <List.Item style={{ flexDirection: 'column' }}>
      <List.Item.Meta
        title={
          <span>
            <Badge
              style={{ marginRight: 8, background: '#52c41a' }}
              count={defination.level}
            />
            { defination.text }
          </span>
        }
        description={
          <span>
            <Dropdown
              overlay={menu}
              visible={dropdownVisibility}
              onMouseEnter={() => setDropdownVisibility(true)}
            >
              <Icon
                type="plus"
                style={{ marginRight: 8, cursor: 'pointer' }}
              />
            </Dropdown>
            <span style={{ color: '#1890ff' }}>{defination.translate}</span>
          </span>
        }
      />
      <List
        itemLayout="vertical"
        dataSource={defination.examples}
        renderItem={renderExample}
      />
    </List.Item>
  )
}

function renderExample(example) {
  return (
    <List.Item>
      <Paragraph>{example.text}</Paragraph>
      <Paragraph style={{ color: '#40a9ff' }}>{example.translate}</Paragraph>
    </List.Item>
  )
}


function IpaButton({ audioUrl }) {
  const [ isPlaying, setPlaying ] = useState(false);

  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setPlaying(false);
    });
  }, [audio]);


  const handleClick = useCallback(
    () => {
      setPlaying(true);
      audio.play();
    },
    [audio],
  );

  return (
    <Button floating
      onClick={handleClick}
    >
    { isPlaying ? 'volume_up' : 'volume_down' }
    </Button>
  )
}

function IpaListItem({ audioUrl, ...props }) {
  const [ isPlaying, setPlaying ] = useState(false);

  const audio = useMemo(() => new Audio(audioUrl), [audioUrl]);

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setPlaying(false);
    });
  }, [audio]);


  const handleClick = useCallback(
    () => {
      setPlaying(true);
      audio.currentTime = 0;
      audio.play();
    },
    [audio],
  );

  return (
    <ListItem
      onClick={handleClick}
      leftAvatar={<Avatar suffix='white' icon={<FontIcon>{ isPlaying ? 'volume_up' : 'volume_down' }</FontIcon>} className="md-paper md-paper--2"></Avatar>}
      {...props}
    />
  );
}
