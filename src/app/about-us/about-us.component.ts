import { Component, OnInit } from '@angular/core';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor(private tableService: TableService){}
  public aboutData: any

  ngOnInit(): void {
      this.getTableData()
  }

  getTableData(){
    this.tableService.getImageData('about/all').subscribe(res =>{
     this.aboutData = res
    },err =>{
      console.error(err);
    });
  }

  onSubmit(id: any){
    this.tableService.updatetoDb(this.aboutData[id],'about/update/').subscribe(() =>{
      this.getTableData()
    },err =>{
      console.error(err);
    })
  }

}
