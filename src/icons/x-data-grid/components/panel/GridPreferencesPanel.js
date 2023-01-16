import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { gridColumnDefinitionsSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { gridPreferencePanelStateSelector } from '../../hooks/features/preferencesPanel/gridPreferencePanelSelector';
import { GridPreferencePanelsValue } from '../../hooks/features/preferencesPanel/gridPreferencePanelsValue';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridPreferencesPanel = /*#__PURE__*/React.forwardRef(function GridPreferencesPanel(props, ref) {
  var _preferencePanelState, _rootProps$components, _rootProps$components2;

  const apiRef = useGridApiContext();
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const rootProps = useGridRootProps();
  const preferencePanelState = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  const panelContent = apiRef.current.unstable_applyPipeProcessors('preferencePanel', null, (_preferencePanelState = preferencePanelState.openedPanelValue) != null ? _preferencePanelState : GridPreferencePanelsValue.filters);
  return /*#__PURE__*/_jsx(rootProps.components.Panel, _extends({
    ref: ref,
    as: rootProps.components.BasePopper,
    open: columns.length > 0 && preferencePanelState.open
  }, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.panel, props, (_rootProps$components2 = rootProps.componentsProps) == null ? void 0 : _rootProps$components2.basePopper, {
    children: panelContent
  }));
});