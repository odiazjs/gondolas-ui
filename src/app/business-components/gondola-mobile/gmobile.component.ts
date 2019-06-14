import { ProductMobileDialogComponent } from './product-mobile-dialog';
import { Dictionary } from '../ngxs/catalogs.state';
import { Side } from '../products/services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GridsterConfig, GridsterItem, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { getUrlConfiguration } from '@asura-media/ui-sdk';
import { ExhibitorDataService } from '../exhibitor/exhibitor.data.service';
import { ActivatedRoute } from '@angular/router';
import { gondolaDataHelper } from './gmobile-data.helper';
import { Response } from '@angular/http';

@Component({
  selector: 'app-gondola-mobile',
  templateUrl: './gmobile.component.html',
  styleUrls: ['./gmobile.component.scss']
})
export class GondolaMobileComponent implements OnInit {

  columns = 11;
  rows = 11;
  @Input('tiles') tiles: Tile[] = [];
  selectedTiles: Dictionary<Tile> = {};

  counter = 0;
  options: GridsterConfig;
  dashboard: Array<Tile>;

  imgUrl = getUrlConfiguration().imgUrl;

  constructor(
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public exhibitorDataService: ExhibitorDataService) {

    this.exhibitorDataService.model.height = this.rows;
    this.exhibitorDataService.model.width = this.columns;

  }
  ngOnInit(): void {
    this.initGridster();
  }

  initGridster() {
    this.options = {
      gridType: GridType.ScrollHorizontal,
      compactType: CompactType.None,
      margin: 0,
      minCols: this.columns,
      maxCols: 11,
      minRows: this.rows,
      maxRows: 11,
      maxItemCols: 11,
      minItemCols: 1,
      maxItemRows: 11,
      minItemRows: 1,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      mobileBreakpoint: 125,
      fixedColWidth: 50,
      fixedRowHeight: 50,
      draggable: {
        enabled: false,
      },
      resizable: {
        enabled: true,
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
      enableEmptyCellClick: false,
      emptyCellClickCallback: (event: MouseEvent, item: GridsterItem) => {
        this.viewProduct(item);
      },
    };
    this.fillGrid();
  }

  fillGrid() {

    this.tiles = [];

    let cells = [];
    const { snapshot: { params: { id, token } } } = this.activatedRoute;

    this.exhibitorDataService.getExhibitorById(id, token)
      .subscribe((result: Response) => {
        const json = result.json()
        cells = json.data.cells ? [...json.data.cells] : [];

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

      })
  }

  viewProduct(item: GridsterItem) {
    const dialogRef = this.dialog.open(ProductMobileDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { item }
    });
    dialogRef.afterClosed().pipe().subscribe(side => {
      if (side) {

      }
    });
  }

  onNoClick() {
    ProductMobileDialogComponent.prototype.onNoClick();
  }

}

export interface Tile extends GridsterItem {
  id?: number;
  color?: string;
  side?: Side;
}


