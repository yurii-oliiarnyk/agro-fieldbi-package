import React from 'react';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import { COLORS } from '../../../constants';
import { openURL } from '../../../helpers';

const AppHTMLViewer = props => {
  const { content } = props;

  return (
    <HTML
      html={content}
      tagsStyles={{
        h1: {
          fontWeight: 'normal',
          fontSize: 28,
          lineHeight: 40,
          marginBottom: 8
        },
        h2: {
          fontWeight: 'normal',
          fontSize: 21,
          lineHeight: 24,
          marginBottom: 8
        },
        h3: {
          fontWeight: 'normal',
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 8
        },
        p: {
          fontSize: 14,
          marginBottom: 14
        },
        ul: {
          paddingLeft: 0,
          marginBottom: 14
        },
        ol: {
          paddingLeft: 0,
          marginBottom: 14
        },
        a: {
          color: COLORS.MAIN
        }
      }}
      onLinkPress={(_, link) => openURL(link)}
      containerStyle={{ marginBottom: -8 }}
    />
  );
};

AppHTMLViewer.propTypes = {
  content: PropTypes.string.isRequired
};

export default AppHTMLViewer;
