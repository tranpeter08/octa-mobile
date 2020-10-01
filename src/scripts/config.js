const config = {
  employeeIdQ: '#EmployeeDisplayId',
  menuTitleQ: '.MainMenuCurrentItem.MainMenuClose',
  queries: [
    {
      menuTitle: 'Work Bid',
      bidIdClasses:
        'WorkBidWorkDetailHeader_Cell_Value Position_OCTANumber_Cell_Value Cell_Value',
      headerClasses: {
        parent: 'WorkBidWorkDetailHeader_View',
        cell:
          'WorkBidWorkDetailHeader_Cell Position_PermitsExtraDuty_Cell Field_Cell',
        label:
          'WorkBidWorkDetailHeader_Cell_Label Position_PermitsExtraDuty_Cell_Label Cell_Label',
        value:
          'WorkBidWorkDetailHeader_Cell_Value Position_PermitsExtraDuty_Cell_Value Cell_Value',
      },
      fieldClasses: {
        parent: 'RosterPositionDetailRosterAssignment',
        day: 'RosterPositionDetailRosterAssignmentHeaderTitle',
        detail: 'WorkBidWorkDetailRosterAssignment_View',
        cell: 'WorkBidWorkDetailRosterAssignment_Cell EndTime_Cell Field_Cell',
        runId:
          'WorkBidWorkDetailRosterAssignment_Cell_Value Identifier_Cell_Value Cell_Value',
        start:
          'WorkBidWorkDetailRosterAssignment_Cell_Value StartTime_Cell_Value Cell_Value',
        end:
          'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value',
        work:
          'WorkBidWorkDetailRosterAssignment_Cell_Value WorkingTime_Cell_Value Cell_Value',
        label:
          'WorkBidWorkDetailHeader_Cell_Label Position_PermitsExtraDuty_Cell_Label Cell_Label',
        value:
          'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value',
      },
    },
    {
      menuTitle: 'Open Assignment Bid',
      bidIdClasses:
        'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value OpenAssignment_OCTANumber_Cell_Value Cell_Value',
      headerClasses: {
        parent: 'OpenAssignmentBidOpenAssignmentDetailHeader_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell OpenAssignment_OCTANumber_Cell Field_Cell',
        label:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Label UnavailableWeeks_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value UnavailableWeeks_Cell_Value Cell_Value',
      },
      fieldClasses: {
        parent: 'OpenAssignmentDetailWorkday',
        day: 'OpenAssignmentDetailWorkdayHeaderTitle',
        detail: 'OpenAssignmentBidOpenAssignmentDetailWorkday_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell WorkingTime_Cell Field_Cell',
        runId: 'DisplayIdentifier_Cell_Value',
        start: 'StartTime_Cell_Value',
        end: 'EndTime_Cell_Value',
        work: 'WorkingTime_Cell_Value',
        label:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value Cell_Value',
      },
    },
    {
      menuTitle: 'Holiday Bid',
      bidIdClasses: '_',
      field: 'ThirdRow_Group Field_Group',
      items: [
        {
          id: 'PreferredDayAssignments',
          listParent: 'HolidayBidPreferredDayAssignment_View',
          workTime:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_WorkingTime_Cell_Value Cell_Value',
          start:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_StartTime_Cell_Value Cell_Value',
          end:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_EndTimeDsp_Cell_Value Cell_Value',
        },
        {
          id: 'AvailableDuties',
          listParent: 'HolidayBidAvailableDuty_View',
          workTime:
            'HolidayBidAvailableDuty_Cell_Value Assignment_WorkingTime_Cell_Value Cell_Value',
          start:
            'HolidayBidAvailableDuty_Cell_Value Assignment_StartTime_Cell_Value Cell_Value',
          end:
            'HolidayBidAvailableDuty_Cell_Value Assignment_EndTimeDsp_Cell_Value Cell_Value',
        },
      ],
    },
  ],
};

export default `
const Config = {
  employeeIdQ: '#EmployeeDisplayId',
  menuTitleQ: '.MainMenuCurrentItem.MainMenuClose',
  queries: [
    {
      menuTitle: 'Work Bid',
      bidIdClasses:
        'WorkBidWorkDetailHeader_Cell_Value Position_OCTANumber_Cell_Value Cell_Value',
      headerClasses: {
        parent: 'WorkBidWorkDetailHeader_View',
        cell:
          'WorkBidWorkDetailHeader_Cell Position_PermitsExtraDuty_Cell Field_Cell',
        label:
          'WorkBidWorkDetailHeader_Cell_Label Position_PermitsExtraDuty_Cell_Label Cell_Label',
        value:
          'WorkBidWorkDetailHeader_Cell_Value Position_PermitsExtraDuty_Cell_Value Cell_Value',
      },
      fieldClasses: {
        parent: 'RosterPositionDetailRosterAssignment',
        day: 'RosterPositionDetailRosterAssignmentHeaderTitle',
        detail: 'WorkBidWorkDetailRosterAssignment_View',
        cell: 'WorkBidWorkDetailRosterAssignment_Cell EndTime_Cell Field_Cell',
        runId:
          'WorkBidWorkDetailRosterAssignment_Cell_Value Identifier_Cell_Value Cell_Value',
        start:
          'WorkBidWorkDetailRosterAssignment_Cell_Value StartTime_Cell_Value Cell_Value',
        end:
          'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value',
        work:
          'WorkBidWorkDetailRosterAssignment_Cell_Value WorkingTime_Cell_Value Cell_Value',
        label:
          'WorkBidWorkDetailHeader_Cell_Label Position_PermitsExtraDuty_Cell_Label Cell_Label',
        value:
          'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value',
      },
    },
    {
      menuTitle: 'Open Assignment Bid',
      bidIdClasses:
        'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value OpenAssignment_OCTANumber_Cell_Value Cell_Value',
      headerClasses: {
        parent: 'OpenAssignmentBidOpenAssignmentDetailHeader_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell OpenAssignment_OCTANumber_Cell Field_Cell',
        label:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Label UnavailableWeeks_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value UnavailableWeeks_Cell_Value Cell_Value',
      },
      fieldClasses: {
        parent: 'OpenAssignmentDetailWorkday',
        day: 'OpenAssignmentDetailWorkdayHeaderTitle',
        detail: 'OpenAssignmentBidOpenAssignmentDetailWorkday_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell WorkingTime_Cell Field_Cell',
        runId: 'DisplayIdentifier_Cell_Value',
        start: 'StartTime_Cell_Value',
        end: 'EndTime_Cell_Value',
        work: 'WorkingTime_Cell_Value',
        label:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value Cell_Value',
      },
    },
    {
      menuTitle: 'Holiday Bid',
      bidIdClasses: '_',
      field: 'ThirdRow_Group Field_Group',
      items: [
        {
          id: 'PreferredDayAssignments',
          listParent: 'HolidayBidPreferredDayAssignment_View',
          workTime:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_WorkingTime_Cell_Value Cell_Value',
          start:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_StartTime_Cell_Value Cell_Value',
          end:
            'HolidayBidPreferredDayAssignment_Cell_Value Assignment_EndTimeDsp_Cell_Value Cell_Value',
        },
        {
          id: 'AvailableDuties',
          listParent: 'HolidayBidAvailableDuty_View',
          workTime:
            'HolidayBidAvailableDuty_Cell_Value Assignment_WorkingTime_Cell_Value Cell_Value',
          start:
            'HolidayBidAvailableDuty_Cell_Value Assignment_StartTime_Cell_Value Cell_Value',
          end:
            'HolidayBidAvailableDuty_Cell_Value Assignment_EndTimeDsp_Cell_Value Cell_Value',
        },
      ],
    },
  ],
};

`;
