import React from 'react'
import { SiAmazon, SiAngularjs, SiBootstrap, SiDigitalocean, SiExpress, SiFirebase, 
        SiFlutter, SiGooglecloud, SiIbmcloud, SiMicrosoftazure, SiNodedotjs, SiNumpy, SiOracle, SiPandas, SiPytorch, 
        SiReact, SiRedhatopenshift, SiScikitlearn, SiTailwindcss, SiTensorflow, SiVmware, SiVuedotjs } from 'react-icons/si'

export default function FrameworkIcon({frame}) {
  return (
    <div className='text-gray-300 pl-1'>
        {
            {   
                "Angular": <SiAngularjs/>,
                "Bootstrap": <SiBootstrap/>,
                "Node.js": <SiNodedotjs/>,
                "React": <SiReact/>,
                "React Native": <SiReact/>,
                "Tailwind": <SiTailwindcss/>,
                "Vue.js": <SiVuedotjs/>,
                "NumPy": <SiNumpy/>,
                "Pandas": <SiPandas/>,
                "PyTorch": <SiPytorch/>,
                "SKLearn": <SiScikitlearn/>,
                "TensorFlow": <SiTensorflow/>,
                "AWS": <SiAmazon/>,
                "Azure": <SiMicrosoftazure/>,
                "DigitalOcean": <SiDigitalocean/>,
                "GCP": <SiGooglecloud/>,
                "IBM Cloud": <SiIbmcloud/>,
                "OCI (Oracle)": <SiOracle/>,
                "OpenShift": <SiRedhatopenshift/>,
                "VMWare Cloud": <SiVmware/>,
                "Firebase": <SiFirebase size={15}/>,
                "Flutter": <SiFlutter size={15}/>,

            } [frame] || <></>
        }
    </div>
  )
}
