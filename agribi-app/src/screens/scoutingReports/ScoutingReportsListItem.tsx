import React from 'react';
import i18n from 'i18n-js';
import { ScoutingReportType } from '../../types/scoutingReports';
import {
  ResourcesListItem,
  ResourcesListItemContour,
  ResourcesListItemInfo,
  ResourcesListItemName,
  getFormattedDate,
} from 'agro-package';

type ScoutingReportsListItemTypes = {
  entity: ScoutingReportType;
};

export const ScoutingReportsListItem: React.FC<ScoutingReportsListItemTypes> = props => {
  const { entity } = props;

  return (
    <ResourcesListItem
      MainComponent={
        <>
          <ResourcesListItemName name={entity.field.name} />
          <ResourcesListItemInfo
            name={i18n.t('scoutingReport.date')}
            value={getFormattedDate(entity.date)}
          />
        </>
      }
      LeftComponent={
        <ResourcesListItemContour coordinates={entity.fieldContour.polygon} color="#1ED700" />
      }
    />
  );
};
