import React from 'react'
import { Link } from 'react-router-dom'
import CommunityContainer from './CommunityContainer'
import ConversionContainer from './ConversionContainer'


function MessageSwtching() {

    return (

        <div className="mt-5">
            <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab3"
                role="tablist">
                <li class="nav-item" role="presentation">
                    <a href="#tabs-conversion" class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    " id="tabs-conversion-tab3" data-bs-toggle="pill" data-bs-target="#tabs-conversion" role="tab" aria-controls="tabs-conversion"
                        aria-selected="true">All Conversion</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a href="#tabs-profile3" class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-profile-tab3" data-bs-toggle="pill" data-bs-target="#tabs-profile3" role="tab"
                        aria-controls="tabs-profile3" aria-selected="false">All Communities</a>
                </li>
            </ul>
            <div class="tab-content" id="tabs-tabContent3">
                <div class="tab-pane fade show active" id="tabs-conversion" role="tabpanel" aria-labelledby="tabs-conversion-tab3">
                    <div>
                        <ConversionContainer></ConversionContainer>
                    </div>
                </div>
                <div class="tab-pane fade" id="tabs-profile3" role="tabpanel" aria-labelledby="tabs-profile-tab3">
                    <div>
                        <CommunityContainer></CommunityContainer>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MessageSwtching
