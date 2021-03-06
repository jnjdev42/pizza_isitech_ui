import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridDeliverer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Numéro du livreur", field: "num_Liv", filter: "agNumberColumnFilter", headerCheckboxSelection: true, checkboxSelection: true, sortable: true
      }, {
        headerName: "Nom du livreur", field: "nom_Livreur", filter: "agTextColumnFilter", sortable: true
      }, {
        headerName: "Quartier", field:"nom_Quartier", filter: "agTextColumnFilter", sortable: true
      }
      ],
      rowData: [],
      defaultColDef: { resizable: true },
      rowSelection: 'multiple',
      selectedIds: null
    }
  }

    setRowData(){
        return this.props.rowData;
    }

    onSelectionChanged(){
        var array = [];
        var selectedRows = this.gridApi.getSelectedRows();
        selectedRows.forEach(row => {
            array.push(row.num_Liv)
        })
        this.setState({
            selectedIds: array
        }, () => this.props.updateSelection(this.state.selectedIds))
    }

  onGridReady = params => {
      this.gridApi = params.api;
      this.griColumnApi = params.columnApi;
      this.gridOptions = params.gridOptions;
      this.sizeToFit();
  }

  sizeToFit = () => {
      this.gridApi.sizeColumnsToFit();
  }

  handleDoubleClick(event){
    this.props.openModal(event.data.num_Liv);
  }

  render() {
    return (
        <div
            className="ag-theme-alpine-dark"
            style={{
            height: '100%',
            width: '100%' }}
        >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.props.rowData}
          onGridReady={this.onGridReady}
          suppressRowClickSelection={true}
          suppressCellSelection={true}
          rowSelection={this.state.rowSelection}
          onSelectionChanged={this.onSelectionChanged.bind(this)}
          onRowDoubleClicked={(event) => this.handleDoubleClick(event)}
          >
        </AgGridReact>

        </div>
    );
  }
}

export default GridDeliverer;
