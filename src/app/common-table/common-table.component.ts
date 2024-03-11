import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../service/table.service';
import {Location} from '@angular/common';
import { LoaderService } from '../service/loader.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit{
  selectedFile : any;
  scope :any
  public canAddRow : boolean = false
  public isTitle : boolean = false
  public isText : boolean = false
  public isLink : boolean = false
  public isImage : boolean = false
  public isAuthorName : boolean = false
  public isCity : boolean = false
  public isCategory :boolean = false
  public isPortfolio :boolean = false
  public isTable : boolean = true
  public isDelete : boolean = false
  public tableData:any = []
  public  categories : string[]  = []
  public  activeCategory : string  = ''

  constructor(private route: ActivatedRoute,
   private tableService: TableService, private _location: Location, private readonly loaderService : LoaderService) { }

  ngOnInit(): void {
    this.scope =this.route.snapshot.routeConfig?.path
    if(this.route.snapshot?.params['category']){
      this.activeCategory = this.route.snapshot?.params['category'] 
    }
    this.getTableData()
  }



  getTableData(){
    this.tableService.getImageData(this.setUrlFromScope(this.scope,false,false,false)).subscribe(res =>{
     this.tableData = res
     if(this.scope === 'portfolio-image'){
      this.categories=[]
      this.tableData.forEach((element: { category: any; }) => {
      this.categories.push(element.category)
      });
     }
    },err =>{
      console.error(err);
    });
  }




  private setUrlFromScope(scope: any, isUpdateUrl:boolean, isDeleteUrl:boolean  ,isAdd :boolean): string{
    let url = ''
    let updateUrl = ''
    let deleteUrl = ''
    let addUrl = ''
    this.scope = scope
      switch (scope) {
        case 'home':
          url = 'all/'
          updateUrl = 'update/'
          this.isTitle = true
          this.isImage = true
          break;
        case 'portfolio-image':
          url = 'portfolio/all/'
          updateUrl = 'portfolio/update/'
          this.isImage = true
          this.isCategory = true
          break;
        case 'category/:category':
          url =  'portfolio/'+ this.activeCategory + '/'
          updateUrl = 'portfolio/update/'
          addUrl ='portfolio/upload'
          deleteUrl ='portfolio/deletePortfolio/'
          this.isImage = true
          this.canAddRow = true
          this.isDelete =true
          break;
        case 'portfolio-video':
          url = 'link/all/'
          updateUrl = 'link/update/'
          deleteUrl ='video/delete/'
          addUrl ='link/upload'
          this.isTitle = true
          this.isText = true
          this.isLink = true
          this.canAddRow = true
          this.isDelete= true
          break;
        case 'testimonial':
          url = 'testimonial/all/'
          updateUrl = 'testimonial/'
          deleteUrl ='testimonial/deleteTestimonial/'
          addUrl ='testimonial/upload'
          this.isText = true
          this.isAuthorName = true 
          this.isCity = true
          this.canAddRow = true
          this.isDelete= true
          break;
        case 'our-clients':
          url = 'clients/all/'
          updateUrl = 'clients/update/'
          deleteUrl = 'OurClients/deleteOurClient/'
          addUrl = 'clients/upload'
          this.isImage = true
          this.canAddRow = true
          this.isDelete= true
          this.isLink = true
          break;
        case 'service':
          url = 'service/all/'
          updateUrl = 'service/update/'
          this.isTitle = true
          this.isText = true
          this.isImage = true
          break;
        case 'blogs':
          url = 'blog/all'
          updateUrl = 'blog/update/'
          deleteUrl = 'blog/deleteBlog/'
          addUrl = 'blog/upload'
          this.isTitle = true
          this.isText = true
          this.isImage = true
          this.canAddRow = true
          this.isDelete= true
          break;
      }
      if(isUpdateUrl){
       return updateUrl;
      }
      else if(isDeleteUrl){
        return deleteUrl;
      }
      else if(isAdd){
        return addUrl
      }
      else{
        return url;
      }
  
    
  }

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

updateData(id:any,url?:any){
  let addNewItem :boolean
  this.tableData[id]._id ? addNewItem = false : addNewItem = true
  if(url){
    this.tableData[id].image = url
  }
  let hasEmptyStringValue: boolean = false
    for (const key in this.tableData[id]) {
      if (Object.prototype.hasOwnProperty.call(this.tableData[id], key)) {
          if (this.tableData[id][key] === '') {
              hasEmptyStringValue = true;
              break;
          }
      }
  }
  if(hasEmptyStringValue){
    this.loaderService.createToast('error', 'You can not send empty field' ,1500);
    return
  }
  if(addNewItem){
  this.tableService.addNewtoDb(this.tableData[id], this.setUrlFromScope(this.scope,false,false, true)).subscribe(() =>{
    this.getTableData()
  },err =>{
    console.error(err);
  })
  }
  else{
    this.tableService.updatetoDb(this.tableData[id], this.setUrlFromScope(this.scope,true,false, false)).subscribe(() =>{
      this.getTableData()
    },err =>{
      console.error(err);
    })
  }
}

onSubmit(id:number){
 if(this.selectedFile){
      this.tableService.uploadToCloudinary(this.selectedFile)
      .subscribe((res:any) => {
        this.updateData(id,res.url  );
        this.selectedFile =''
      },err =>{
        console.error(err);
      })
    }else{
      this.updateData(id);
    }
}

onDelete(index:number){
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.tableService.deleteData(this.tableData[index]._id,this.setUrlFromScope(this.scope,false,true,false)).subscribe(res =>{
        this.getTableData()
      }, err =>{
        console.error(err);
      })
    }
  });
 
}

addEmptyRow() {
  let emptyObject 
  switch (this.route.snapshot.routeConfig?.path) {
    case 'category/:category':
      emptyObject = { category: this.activeCategory , image:''}
      break;
    case 'testimonial':
      emptyObject = { title: '', text: '' ,authorName:'',city:''}
      break;
    case 'portfolio-video':
      emptyObject = { title: '', text: '' ,link:''}
      break;
    case 'our-clients':
      emptyObject = { image:'', link:''}
      break;
    case 'blogs':
      emptyObject = { title: '', text: '' ,image:''}
      break;
  }
  this.tableData.push(emptyObject); 
}

public goBack(){
  this._location.back();
}
}

