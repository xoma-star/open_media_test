import {createRoot} from 'react-dom/client'
import App from "./App.tsx";
import React from "react";

const root = createRoot(document.getElementById('react-form') as HTMLDivElement)

root.render(React.createElement(App))


const switchToOwnElement = document.getElementById('switch-to-own') as HTMLElement
const switchToAmazonElement = document.getElementById('switch-to-amazon') as HTMLElement

const switchTechRequirements = (own: HTMLElement, aws: HTMLElement) => {
    let activeTab: 'own' | 'aws' = 'own'
    const awsTable = document.getElementById('requirements-aws') as HTMLElement
    const ownTable = document.getElementById('requirements-own') as HTMLElement
    const listener = (tab: typeof activeTab) => {
        if (tab === 'aws') {
            ownTable.className = 'hidden'
            own.className = ''
            awsTable.className = ''
            aws.className = 'active'
            activeTab = 'aws'
        } else {
            ownTable.className = ''
            own.className = 'active'
            awsTable.className = 'hidden'
            aws.className = ''
            activeTab = 'own'
        }
    }
    own.addEventListener('click', () => listener('own'))
    aws.addEventListener('click', () => listener('aws'))
}

switchTechRequirements(switchToOwnElement, switchToAmazonElement)