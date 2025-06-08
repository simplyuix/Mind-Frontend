import { Shareicon } from '../../icon/shareicon';
interface cardComponet {
    title : string ;
    type : "twitter" | "youtube",
    link : string


}

const basicStyle = "bg-white rounded-md p-4 shadow-md outline-slate-200 border-grey-100 m-8 max-w-72 "


export function Card(props : cardComponet) {
    return <div className={`${basicStyle} `}>
       <div className="flex justify-between items-center">
            <div className='flex my-4 items-center'>
                <Shareicon />
                <span className='ml-2'>Project ideas</span>
            </div>
            <div className='flex pr-8'>
                <Shareicon />
                <Shareicon />
            </div>
           </div>
           <div className='pt-6'>
            {props.type=='youtube' && <iframe width="560" className='w-full'  height="315" src={`${props.link}`} 
 title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
 }          
           {props.type=='twitter' && <blockquote className="twitter-tweet">
                    <a href={props.link.replace("x.com", "twitter.com")}></a> 
              
          </blockquote>}
       
           </div>
           
      
    </div>
}