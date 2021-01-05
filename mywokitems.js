const url = 'http://yourhost:yourport/sap/opu/odata/IWPGW/TASKPROCESSING;mo;v=2/ScenarioCollection?$filter=key%20eq%20%27ZMYINBOX%27&$format=json&sap-user=youruser&sap-password=yourpw'
const image = await getImage('ixlog.png')
const imi = await getImage('SAP_Jedox_Partner.png')


let widget = await createWidget()
widget.backgroundColor = new Color("#000000")

if(!config.runsInWidget){
 await widget.presentSmall()
}

Script.setWidget(widget)
Script.complete()

async function createWidget(){
  
const list = new ListWidget()
let wi
let header

try{
let req = new Request(url)
let apiResult = await req.loadJSON()

const logoiXlog = list.addStack()
logoiXlog.addSpacer(5)
logoiXlog.layoutHorizontally()
img = logoiXlog.addImage(image)
img.imageSize = new Size(40,40)
list.addSpacer(29)

let column = logoiXlog.addStack()
column.addSpacer(50)
column.layoutHorizontally()
const ima = column.addImage(imi)
ima.imageSize = new Size(40,40)

wi = list.addText((apiResult.d.results[0].number).toString())
wi.font = Font.boldSystemFont(25)
wi.textColor = Color.white()
list.addSpacer(5)

header = list.addText("WORKITEMS")
header.font = Font.mediumRoundedSystemFont(15)
header.textColor = Color.white()

} catch {
wi = list.addText("Kein Internet?")
wi.font = Font.mediumSystemFont(12)
}

header.centerAlignText()
wi.centerAlignText()
 
return list
 }

async function getImage(image) {
   let fm = FileManager.local()
   let dir = fm.documentsDirectory()
   let path = fm.joinPath(dir, image)
   if (fm.fileExists(path)) {
       return fm.readImage(path)
   } else {
       // download once
       let imageUrl
       switch (image) {
           case 'ixlog.png':
               imageUrl = "https://ixlog.com/wp-content/uploads/2018/02/ixlog-logo_white.png"
               break
case 'SAP_Jedox_Partner.png': 
imageUrl = "https://ixlog.com/wp-content/uploads/2020/10/SAP_Jedox_Partner.png"
break
           default:
               console.log(`Sorry, couldn't find ${image}.`);
       }
       let iconImage = await loadImage(imageUrl)

       fm.writeImage(path, iconImage)
       return iconImage
   }


// helper function to download an image from a given url
async function loadImage(imgUrl) {
   const req = new Request(imgUrl)
   return await req.loadImage()
}
}

