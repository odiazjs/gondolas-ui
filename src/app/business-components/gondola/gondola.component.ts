import { Dictionary } from './../ngxs/catalogs.state';
import { Side } from './../products/services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog';
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { ExhibitorDataService } from '../exhibitor/exhibitor.data.service';
import { gondolaDataHelper } from './gondola-data.helper';

@Component({
  selector: 'app-gondola',
  templateUrl: './gondola.component.html',
  styleUrls: ['./gondola.component.scss']
})
export class GondolaComponent implements OnInit {

  columns = 11;
  rows = 11;

  @Input('tiles') tiles: Tile[] = [];
  @Input('existingCells') existingCells: any[];

  selectedTiles: Dictionary<Tile> = {};

  counter = 0;
  options: GridsterConfig;
  dashboard: Array<Tile>;

  imgUrl = getUrlConfiguration().imgUrl;

  constructor(public dialog: MatDialog, public exhibitorDataService: ExhibitorDataService) {
    this.exhibitorDataService.model.height = this.rows;
    this.exhibitorDataService.model.width = this.columns;
  }
  ngOnInit(): void {
    this.initGridster();
  }

  initGridster() {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 0,
      mobileBreakpoint: 640,
      minCols: this.columns,
      maxCols: 100,
      minRows: this.rows,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 25,
      fixedRowHeight: 25,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: true,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: true,
      enableEmptyCellClick: true,
      enableEmptyCellDrop: true,
      emptyCellDropCallback: (event: MouseEvent, item: GridsterItem) => {
        console.log('dropped!', item);
      },
      emptyCellClickCallback: (event: MouseEvent, item: GridsterItem) => {
        this.addProduct(item);
      },
    };
    const cellsInterval = setInterval(() => {
      if (!this.tiles.length) {
        if (this.existingCells.length) this.fillGrid(this.existingCells);
        clearInterval(cellsInterval);
      }
    }, 500)
  }

  fillGrid (cells) {

    cells.forEach((cell) => {
      this.tiles.push({
        id: cell.id,
        color: 'lightgrey',
        side: cell.side,
        cols: cell.side.width / gondolaDataHelper.sideSizeRate,
        rows: cell.side.height / gondolaDataHelper.sideSizeRate,
        x: cell.x,
        y: cell.y
      })
    })

    this.dashboard = [...this.tiles];
    this.exhibitorDataService.model.cells = [...this.tiles];

  }

  addProduct(itemGrid: GridsterItem) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().pipe().subscribe(side => {
      if (side) {
        this.tiles.push(
          {
            color: 'lightgrey',
            side: side,
            cols: Math.floor(side.width / 2),
            rows: Math.floor(side.height / 2),
            x: itemGrid.x,
            y: itemGrid.y
          }
        );
        this.dashboard = [...this.tiles];
        this.selectedTiles[side.id] = Object.assign({}, side);
        this.exhibitorDataService.model.cells = [...this.tiles];
      }
    });
  }

  removeItem($event, item: Tile) {
    setTimeout(() => {
      $event.preventDefault();
      $event.stopPropagation();
      this.tiles.splice(this.tiles.indexOf(item), 1);
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }, 150)
  }

  onNoClick() {
    ProductDialogComponent.prototype.onNoClick();
  }

}

export interface Tile extends GridsterItem {
  id?: number;
  color?: string;
  side?: Side;
}


