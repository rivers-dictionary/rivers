import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from '@reach/router';
import { List, Card, Badge, Spin } from 'antd';

export default function Dictionary({ dictionaryId }) {
  const dictionary = useSelector(state => {
    const dictionary = state.dictionaries[dictionaryId];

    if (!dictionary) return undefined;

    return {
      ...dictionary,
      definations: dictionary.definations.map(
        defId => state.definations[defId],
      )
    }
  });

  if (!dictionary)
      return (
        <Spin />
      )

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={dictionary.definations}
      renderItem={renderDefination}
    />
  )
}

function renderDefination(defination) {
  return (
    <List.Item>
      <Card>
        <Card.Meta
          title={
            <span>
              <Badge
                style={{ marginRight: 8, background: '#52c41a' }}
                count={defination.level}
              />
              <Link to={`/words/${defination.word}`}>
                {defination.word}
              </Link>
            </span>
          }
          description={defination.translate}
        />
      </Card>
    </List.Item>
  )
}
