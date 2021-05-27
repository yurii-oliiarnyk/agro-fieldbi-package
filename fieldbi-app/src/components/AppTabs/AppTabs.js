import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Platform } from 'react-native';
import { Tabs, Tab, ScrollableTab, View } from 'native-base';
import { COLORS } from '../../constants';

const AppTabs = props => {
  const {
    data,
    renderTab,
    keyExtractor,
    renderName,
    ListEmptyComponent,
    locked,
    scrollableContent,
    scrollableTabs
  } = props;

  const TabWrapper = scrollableContent ? ScrollView : View;

  if (!data.length) {
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }
  }

  if (data.length === 1) {
    return <TabWrapper style={{ flex: 1 }}>{renderTab(data[0])}</TabWrapper>;
  }

  const styles = {
    ...Platform.select({
      android: {
        backgroundColor: COLORS.MAIN
      }
    })
  };

  return (
    <Tabs
      locked={locked}
      renderTabBar={scrollableTabs ? () => <ScrollableTab style={styles} /> : undefined}
    >
      {data.map(tab => {
        return (
          <Tab key={keyExtractor(tab)} heading={renderName(tab)}>
            <TabWrapper style={{ flex: 1 }}>{renderTab(tab)}</TabWrapper>
          </Tab>
        );
      })}
    </Tabs>
  );
};

AppTabs.propTypes = {
  data: PropTypes.array.isRequired,
  renderTab: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  renderName: PropTypes.func.isRequired,
  ListEmptyComponent: PropTypes.node,
  scrollableContent: PropTypes.bool,
  scrollableTabs: PropTypes.bool,
  locked: PropTypes.bool
};

AppTabs.defaultProps = {
  scrollableContent: true,
  scrollableTabs: true
};

export default AppTabs;
