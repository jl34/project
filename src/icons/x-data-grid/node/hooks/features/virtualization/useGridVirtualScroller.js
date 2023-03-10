"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;
exports.useGridVirtualScroller = exports.getRenderableIndexes = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _utils = require("@mui/material/utils");

var _useGridApiContext = require("../../utils/useGridApiContext");

var _useGridRootProps = require("../../utils/useGridRootProps");

var _useGridSelector = require("../../utils/useGridSelector");

var _gridColumnsSelector = require("../columns/gridColumnsSelector");

var _densitySelector = require("../density/densitySelector");

var _gridFocusStateSelector = require("../focus/gridFocusStateSelector");

var _gridEditRowsSelector = require("../editRows/gridEditRowsSelector");

var _useGridVisibleRows = require("../../utils/useGridVisibleRows");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

var _utils2 = require("../../../utils/utils");

var _gridSelectionSelector = require("../selection/gridSelectionSelector");

var _gridRowsMetaSelector = require("../rows/gridRowsMetaSelector");

var _gridColumnsUtils = require("../columns/gridColumnsUtils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["style"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Uses binary search to avoid looping through all possible positions
function binarySearch(offset, positions, sliceStart = 0, sliceEnd = positions.length) {
  if (positions.length <= 0) {
    return -1;
  }

  if (sliceStart >= sliceEnd) {
    return sliceStart;
  }

  const pivot = sliceStart + Math.floor((sliceEnd - sliceStart) / 2);
  const itemOffset = positions[pivot];
  return offset <= itemOffset ? binarySearch(offset, positions, sliceStart, pivot) : binarySearch(offset, positions, pivot + 1, sliceEnd);
}

function exponentialSearch(offset, positions, index) {
  let interval = 1;

  while (index < positions.length && positions[index] < offset) {
    index += interval;
    interval *= 2;
  }

  return binarySearch(offset, positions, Math.floor(index / 2), Math.min(index, positions.length));
}

const getRenderableIndexes = ({
  firstIndex,
  lastIndex,
  buffer,
  minFirstIndex,
  maxLastIndex
}) => {
  return [(0, _utils2.clamp)(firstIndex - buffer, minFirstIndex, maxLastIndex), (0, _utils2.clamp)(lastIndex + buffer, minFirstIndex, maxLastIndex)];
};

exports.getRenderableIndexes = getRenderableIndexes;

const useGridVirtualScroller = props => {
  var _currentPage$range3, _currentPage$range4;

  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const visibleColumns = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridVisibleColumnDefinitionsSelector);
  const {
    ref,
    disableVirtualization,
    onRenderZonePositioning,
    renderZoneMinColumnIndex = 0,
    renderZoneMaxColumnIndex = visibleColumns.length,
    getRowProps
  } = props;
  const columnPositions = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnPositionsSelector);
  const columnsTotalWidth = (0, _useGridSelector.useGridSelector)(apiRef, _gridColumnsSelector.gridColumnsTotalWidthSelector);
  const rowHeight = (0, _useGridSelector.useGridSelector)(apiRef, _densitySelector.gridDensityRowHeightSelector);
  const cellFocus = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridFocusCellSelector);
  const cellTabIndex = (0, _useGridSelector.useGridSelector)(apiRef, _gridFocusStateSelector.gridTabIndexCellSelector);
  const rowsMeta = (0, _useGridSelector.useGridSelector)(apiRef, _gridRowsMetaSelector.gridRowsMetaSelector);
  const editRowsState = (0, _useGridSelector.useGridSelector)(apiRef, _gridEditRowsSelector.gridEditRowsStateSelector);
  const selectedRowsLookup = (0, _useGridSelector.useGridSelector)(apiRef, _gridSelectionSelector.selectedIdsLookupSelector);
  const currentPage = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, rootProps);
  const renderZoneRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const handleRef = (0, _utils.useForkRef)(ref, rootRef);
  const [renderContext, setRenderContext] = React.useState(null);
  const prevRenderContext = React.useRef(renderContext);
  const scrollPosition = React.useRef({
    top: 0,
    left: 0
  });
  const [containerWidth, setContainerWidth] = React.useState(null);
  const prevTotalWidth = React.useRef(columnsTotalWidth);
  const getNearestIndexToRender = React.useCallback(offset => {
    var _currentPage$range, _currentPage$range2;

    const lastMeasuredIndexRelativeToAllRows = apiRef.current.unstable_getLastMeasuredRowIndex();
    let allRowsMeasured = lastMeasuredIndexRelativeToAllRows === Infinity;

    if ((_currentPage$range = currentPage.range) != null && _currentPage$range.lastRowIndex && !allRowsMeasured) {
      // Check if all rows in this page are already measured
      allRowsMeasured = lastMeasuredIndexRelativeToAllRows >= currentPage.range.lastRowIndex;
    }

    const lastMeasuredIndexRelativeToCurrentPage = (0, _utils2.clamp)(lastMeasuredIndexRelativeToAllRows - (((_currentPage$range2 = currentPage.range) == null ? void 0 : _currentPage$range2.firstRowIndex) || 0), 0, rowsMeta.positions.length);

    if (allRowsMeasured || rowsMeta.positions[lastMeasuredIndexRelativeToCurrentPage] >= offset) {
      // If all rows were measured (when no row has "auto" as height) or all rows before the offset
      // were measured, then use a binary search because it's faster.
      return binarySearch(offset, rowsMeta.positions);
    } // Otherwise, use an exponential search.
    // If rows have "auto" as height, their positions will be based on estimated heights.
    // In this case, we can skip several steps until we find a position higher than the offset.
    // Inspired by https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/utils/CellSizeAndPositionManager.js


    return exponentialSearch(offset, rowsMeta.positions, lastMeasuredIndexRelativeToCurrentPage);
  }, [apiRef, (_currentPage$range3 = currentPage.range) == null ? void 0 : _currentPage$range3.firstRowIndex, (_currentPage$range4 = currentPage.range) == null ? void 0 : _currentPage$range4.lastRowIndex, rowsMeta.positions]);
  const computeRenderContext = React.useCallback(() => {
    if (disableVirtualization) {
      return {
        firstRowIndex: 0,
        lastRowIndex: currentPage.rows.length,
        firstColumnIndex: 0,
        lastColumnIndex: visibleColumns.length
      };
    }

    const {
      top,
      left
    } = scrollPosition.current; // Clamp the value because the search may return an index out of bounds.
    // In the last index, this is not needed because Array.slice doesn't include it.

    const firstRowIndex = Math.min(getNearestIndexToRender(top), rowsMeta.positions.length - 1);
    const lastRowIndex = rootProps.autoHeight ? firstRowIndex + currentPage.rows.length : getNearestIndexToRender(top + rootRef.current.clientHeight);
    let hasRowWithAutoHeight = false;
    let firstColumnIndex = 0;
    let lastColumnIndex = columnPositions.length;
    const [firstRowToRender, lastRowToRender] = getRenderableIndexes({
      firstIndex: firstRowIndex,
      lastIndex: lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: currentPage.rows.length,
      buffer: rootProps.rowBuffer
    });

    for (let i = firstRowToRender; i < lastRowToRender && !hasRowWithAutoHeight; i += 1) {
      const row = currentPage.rows[i];
      hasRowWithAutoHeight = apiRef.current.unstable_rowHasAutoHeight(row.id);
    }

    if (!hasRowWithAutoHeight) {
      firstColumnIndex = binarySearch(left, columnPositions);
      lastColumnIndex = binarySearch(left + containerWidth, columnPositions);
    }

    return {
      firstRowIndex,
      lastRowIndex,
      firstColumnIndex,
      lastColumnIndex
    };
  }, [disableVirtualization, getNearestIndexToRender, rowsMeta.positions.length, rootProps.autoHeight, rootProps.rowBuffer, currentPage.rows, columnPositions, visibleColumns.length, apiRef, containerWidth]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (disableVirtualization) {
      renderZoneRef.current.style.transform = `translate3d(0px, 0px, 0px)`;
    } else {
      // TODO a scroll reset should not be necessary
      rootRef.current.scrollLeft = 0;
      rootRef.current.scrollTop = 0;
    }
  }, [disableVirtualization]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    setContainerWidth(rootRef.current.clientWidth);
  }, [rowsMeta.currentPageTotalHeight]);
  const handleResize = React.useCallback(params => {
    setContainerWidth(params.width);
  }, []);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'resize', handleResize);
  const updateRenderZonePosition = React.useCallback(nextRenderContext => {
    const [firstRowToRender, lastRowToRender] = getRenderableIndexes({
      firstIndex: nextRenderContext.firstRowIndex,
      lastIndex: nextRenderContext.lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: currentPage.rows.length,
      buffer: rootProps.rowBuffer
    });
    const [initialFirstColumnToRender] = getRenderableIndexes({
      firstIndex: nextRenderContext.firstColumnIndex,
      lastIndex: nextRenderContext.lastColumnIndex,
      minFirstIndex: renderZoneMinColumnIndex,
      maxLastIndex: renderZoneMaxColumnIndex,
      buffer: rootProps.columnBuffer
    });
    const firstColumnToRender = (0, _gridColumnsUtils.getFirstNonSpannedColumnToRender)({
      firstColumnToRender: initialFirstColumnToRender,
      apiRef,
      firstRowToRender,
      lastRowToRender,
      visibleRows: currentPage.rows
    });
    const top = (0, _gridRowsMetaSelector.gridRowsMetaSelector)(apiRef.current.state).positions[firstRowToRender];
    const left = (0, _gridColumnsSelector.gridColumnPositionsSelector)(apiRef)[firstColumnToRender]; // Call directly the selector because it might be outdated when this method is called

    renderZoneRef.current.style.transform = `translate3d(${left}px, ${top}px, 0px)`;

    if (typeof onRenderZonePositioning === 'function') {
      onRenderZonePositioning({
        top,
        left
      });
    }
  }, [apiRef, currentPage.rows, onRenderZonePositioning, renderZoneMinColumnIndex, renderZoneMaxColumnIndex, rootProps.columnBuffer, rootProps.rowBuffer]);
  React.useLayoutEffect(() => {
    if (renderContext) {
      updateRenderZonePosition(renderContext);
    }
  }, [renderContext, updateRenderZonePosition]);
  const updateRenderContext = React.useCallback(nextRenderContext => {
    setRenderContext(nextRenderContext);
    const [firstRowToRender, lastRowToRender] = getRenderableIndexes({
      firstIndex: nextRenderContext.firstRowIndex,
      lastIndex: nextRenderContext.lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: currentPage.rows.length,
      buffer: rootProps.rowBuffer
    });
    apiRef.current.publishEvent('renderedRowsIntervalChange', {
      firstRowToRender,
      lastRowToRender
    });
    prevRenderContext.current = nextRenderContext;
  }, [apiRef, setRenderContext, prevRenderContext, currentPage.rows.length, rootProps.rowBuffer]);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (containerWidth == null) {
      return;
    }

    const initialRenderContext = computeRenderContext();
    updateRenderContext(initialRenderContext);
    const {
      top,
      left
    } = scrollPosition.current;
    const params = {
      top,
      left,
      renderContext: initialRenderContext
    };
    apiRef.current.publishEvent('rowsScroll', params);
  }, [apiRef, computeRenderContext, containerWidth, updateRenderContext]);

  const handleScroll = event => {
    const {
      scrollTop,
      scrollLeft
    } = event.currentTarget;
    scrollPosition.current.top = scrollTop;
    scrollPosition.current.left = scrollLeft; // On iOS and macOS, negative offsets are possible when swiping past the start

    if (scrollLeft < 0 || scrollTop < 0 || !prevRenderContext.current) {
      return;
    } // When virtualization is disabled, the context never changes during scroll


    const nextRenderContext = disableVirtualization ? prevRenderContext.current : computeRenderContext();
    const topRowsScrolledSincePreviousRender = Math.abs(nextRenderContext.firstRowIndex - prevRenderContext.current.firstRowIndex);
    const bottomRowsScrolledSincePreviousRender = Math.abs(nextRenderContext.lastRowIndex - prevRenderContext.current.lastRowIndex);
    const topColumnsScrolledSincePreviousRender = Math.abs(nextRenderContext.firstColumnIndex - prevRenderContext.current.firstColumnIndex);
    const bottomColumnsScrolledSincePreviousRender = Math.abs(nextRenderContext.lastColumnIndex - prevRenderContext.current.lastColumnIndex);
    const shouldSetState = topRowsScrolledSincePreviousRender >= rootProps.rowThreshold || bottomRowsScrolledSincePreviousRender >= rootProps.rowThreshold || topColumnsScrolledSincePreviousRender >= rootProps.columnThreshold || bottomColumnsScrolledSincePreviousRender >= rootProps.columnThreshold || prevTotalWidth.current !== columnsTotalWidth; // TODO v6: rename event to a wider name, it's not only fired for row scrolling

    apiRef.current.publishEvent('rowsScroll', {
      top: scrollTop,
      left: scrollLeft,
      renderContext: shouldSetState ? nextRenderContext : prevRenderContext.current
    }, event);

    if (shouldSetState) {
      // Prevents batching render context changes
      ReactDOM.flushSync(() => {
        updateRenderContext(nextRenderContext);
      });
      prevTotalWidth.current = columnsTotalWidth;
    }
  };

  const handleWheel = event => {
    apiRef.current.publishEvent('virtualScrollerWheel', {}, event);
  };

  const handleTouchMove = event => {
    apiRef.current.publishEvent('virtualScrollerTouchMove', {}, event);
  };

  const getRows = (params = {
    renderContext
  }) => {
    const {
      renderContext: nextRenderContext,
      minFirstColumn = renderZoneMinColumnIndex,
      maxLastColumn = renderZoneMaxColumnIndex,
      availableSpace = containerWidth,
      rowIndexOffset = 0,
      position = 'center'
    } = params;

    if (!nextRenderContext || availableSpace == null) {
      return null;
    }

    const rowBuffer = !disableVirtualization ? rootProps.rowBuffer : 0;
    const columnBuffer = !disableVirtualization ? rootProps.columnBuffer : 0;
    const [firstRowToRender, lastRowToRender] = getRenderableIndexes({
      firstIndex: nextRenderContext.firstRowIndex,
      lastIndex: nextRenderContext.lastRowIndex,
      minFirstIndex: 0,
      maxLastIndex: currentPage.rows.length,
      buffer: rowBuffer
    });
    const renderedRows = [];

    if (params.rows) {
      params.rows.forEach(row => {
        renderedRows.push(row);
        apiRef.current.unstable_calculateColSpan({
          rowId: row.id,
          minFirstColumn,
          maxLastColumn,
          columns: visibleColumns
        });
      });
    } else {
      if (!currentPage.range) {
        return null;
      }

      for (let i = firstRowToRender; i < lastRowToRender; i += 1) {
        const row = currentPage.rows[i];
        renderedRows.push(row);
        apiRef.current.unstable_calculateColSpan({
          rowId: row.id,
          minFirstColumn,
          maxLastColumn,
          columns: visibleColumns
        });
      }
    }

    const [initialFirstColumnToRender, lastColumnToRender] = getRenderableIndexes({
      firstIndex: nextRenderContext.firstColumnIndex,
      lastIndex: nextRenderContext.lastColumnIndex,
      minFirstIndex: minFirstColumn,
      maxLastIndex: maxLastColumn,
      buffer: columnBuffer
    });
    const firstColumnToRender = (0, _gridColumnsUtils.getFirstNonSpannedColumnToRender)({
      firstColumnToRender: initialFirstColumnToRender,
      apiRef,
      firstRowToRender,
      lastRowToRender,
      visibleRows: currentPage.rows
    });
    const renderedColumns = visibleColumns.slice(firstColumnToRender, lastColumnToRender);
    const rows = [];

    for (let i = 0; i < renderedRows.length; i += 1) {
      var _currentPage$range5, _rootProps$components;

      const {
        id,
        model
      } = renderedRows[i];
      const lastVisibleRowIndex = firstRowToRender + i === currentPage.rows.length - 1;
      const baseRowHeight = !apiRef.current.unstable_rowHasAutoHeight(id) ? apiRef.current.unstable_getRowHeight(id) : 'auto';
      let isSelected;

      if (selectedRowsLookup[id] == null) {
        isSelected = false;
      } else {
        isSelected = apiRef.current.isRowSelectable(id);
      }

      rows.push( /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.components.Row, (0, _extends2.default)({
        row: model,
        rowId: id,
        rowHeight: baseRowHeight,
        cellFocus: cellFocus // TODO move to inside the row
        ,
        cellTabIndex: cellTabIndex // TODO move to inside the row
        ,
        editRowsState: editRowsState // TODO move to inside the row
        ,
        renderedColumns: renderedColumns,
        visibleColumns: visibleColumns,
        firstColumnToRender: firstColumnToRender,
        lastColumnToRender: lastColumnToRender,
        selected: isSelected,
        index: rowIndexOffset + ((currentPage == null ? void 0 : (_currentPage$range5 = currentPage.range) == null ? void 0 : _currentPage$range5.firstRowIndex) || 0) + firstRowToRender + i,
        containerWidth: availableSpace,
        isLastVisible: lastVisibleRowIndex,
        position: position
      }, typeof getRowProps === 'function' ? getRowProps(id, model) : {}, (_rootProps$components = rootProps.componentsProps) == null ? void 0 : _rootProps$components.row), id));
    }

    return rows;
  };

  const needsHorizontalScrollbar = containerWidth && columnsTotalWidth > containerWidth;
  const contentSize = React.useMemo(() => {
    // In cases where the columns exceed the available width,
    // the horizontal scrollbar should be shown even when there're no rows.
    // Keeping 1px as minimum height ensures that the scrollbar will visible if necessary.
    const height = Math.max(rowsMeta.currentPageTotalHeight, 1);
    let shouldExtendContent = false;

    if (rootRef != null && rootRef.current && height <= (rootRef == null ? void 0 : rootRef.current.clientHeight)) {
      shouldExtendContent = true;
    }

    const size = {
      width: needsHorizontalScrollbar ? columnsTotalWidth : 'auto',
      height,
      minHeight: shouldExtendContent ? '100%' : 'auto'
    };

    if (rootProps.autoHeight && currentPage.rows.length === 0) {
      size.height = 2 * rowHeight; // Give room to show the overlay when there's no row.
    }

    return size;
  }, [rootRef, columnsTotalWidth, rowsMeta.currentPageTotalHeight, currentPage.rows.length, needsHorizontalScrollbar, rootProps.autoHeight, rowHeight]);
  React.useEffect(() => {
    apiRef.current.publishEvent('virtualScrollerContentSizeChange');
  }, [apiRef, contentSize]);

  if (rootProps.autoHeight && currentPage.rows.length === 0) {
    contentSize.height = 2 * rowHeight; // Give room to show the overlay when there no rows.
  }

  const rootStyle = {};

  if (!needsHorizontalScrollbar) {
    rootStyle.overflowX = 'hidden';
  }

  if (rootProps.autoHeight) {
    rootStyle.overflowY = 'hidden';
  }

  const getRenderContext = React.useCallback(() => {
    return prevRenderContext.current;
  }, []);
  apiRef.current.unstable_getRenderContext = getRenderContext;
  return {
    renderContext,
    updateRenderZonePosition,
    getRows,
    getRootProps: (_ref = {}) => {
      let {
        style = {}
      } = _ref,
          other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
      return (0, _extends2.default)({
        ref: handleRef,
        onScroll: handleScroll,
        onWheel: handleWheel,
        onTouchMove: handleTouchMove,
        style: (0, _extends2.default)({}, style, rootStyle)
      }, other);
    },
    getContentProps: ({
      style = {}
    } = {}) => ({
      style: (0, _extends2.default)({}, style, contentSize)
    }),
    getRenderZoneProps: () => ({
      ref: renderZoneRef
    })
  };
};

exports.useGridVirtualScroller = useGridVirtualScroller;