import React, { useState, ReactNode } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { TouchableFeedback } from 'agro-package';
import Icon from 'react-native-vector-icons/AntDesign';

type ScoutingReportsTabsProps = {
  tabs: any[];
  addNewTab?: () => void;
  removeTab?: (index: number) => void;
  render: (index: number) => ReactNode;
};

const styles = StyleSheet.create({
  tabHeaderView: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#CBCBCB',
    flexDirection: 'row',
  },
  tab: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    marginLeft: 4,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#CBCBCB',
    alignItems: 'center',
    marginBottom: -1,
  },
  tabActive: {
    backgroundColor: '#00A1FF',
    borderColor: '#00A1FF',
  },
  tabFirst: {
    marginLeft: 0,
  },
  tabText: {
    fontSize: 16,
    color: '#606060',
  },
  tabTextActive: {
    color: '#fff',
  },
  closeIconWrap: {
    marginLeft: 8,
  },
  addIconWrap: {
    marginRight: 8,
  },
  icon: {
    fontSize: 14,
  },
});

export const ScoutingReportsTabs: React.FC<ScoutingReportsTabsProps> = props => {
  const { tabs, addNewTab, render, removeTab } = props;

  const [currentTab, setCurrentTab] = useState(0);

  const addNewTabHandler = () => {
    if (typeof addNewTab === 'function') {
      addNewTab();

      setCurrentTab(tabs.length);
    }
  };

  const removeHandler = (index: number) => {
    if (typeof removeTab === 'function') {
      removeTab(index);

      setCurrentTab(0);
    }
  };

  const showRemoveButton = typeof removeTab === 'function';

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
      <ScrollView horizontal>
        <View style={styles.tabHeaderView}>
          {tabs.map((tab, index) => {
            const isCurrent = currentTab === index;
            const first = index === 0;

            return (
              <TouchableFeedback
                key={index}
                style={[styles.tab, isCurrent && styles.tabActive, first && styles.tabFirst]}
                onPress={() => setCurrentTab(index)}
              >
                <Text style={[styles.tabText, isCurrent && styles.tabTextActive]}>{`Точка ${
                  index + 1
                }`}</Text>
                {isCurrent && showRemoveButton && (
                  <TouchableFeedback
                    onPress={() => removeHandler(index)}
                    style={styles.closeIconWrap}
                  >
                    <Icon name="closecircle" color="#fff" style={styles.icon} />
                  </TouchableFeedback>
                )}
              </TouchableFeedback>
            );
          })}
          {typeof addNewTab === 'function' && (
            <TouchableFeedback onPress={addNewTabHandler} style={styles.tab}>
              <View style={styles.addIconWrap}>
                <Icon name="plus" color="#606060" style={styles.icon} />
              </View>
              <Text style={styles.tabText}>Додати точку</Text>
            </TouchableFeedback>
          )}
        </View>
      </ScrollView>
      <View style={{ paddingTop: 8 }}>{render(currentTab)}</View>
    </View>
  );
};
