import React from 'react';
import VK from '../img/vkontakte.png';
import Facebook from '../img/facebook.png';
import Instagram from '../img/instagram.png';

const AboutService = () => {
    return(
        <footer>
            <div className='footer_copyright_container'>
                &#169; SladowName
            </div>
            <div className='footer_content_container'>
            <div className='footer_contact_container'>
                <div>Контакты:</div>
                <div className='footer_contact_element'>Телефон: +375251237234</div>
                <div className='footer_contact_element'>Email: sladowname@mail.ru</div>
                <div className='footer_contact_element footer_social_image'>
                    <a href='https://vk.com/pasha_grudinsky'><img src={VK.toString()} width='20px' height='20px'/></a>
                    <a href='https://www.facebook.com/profile.php?id=100007936006122'><img src={Facebook.toString()} width='20px' height='20px'/></a>
                    <a href='https://www.instagram.com/pasha.grudinsky/?hl=en'><img src={Instagram.toString()} width='20px' height='20px'/></a>
                </div>
            </div>
            <div className='footer_address_container'>
                <div>
                    Адрес:
                </div>
                <div className='footer_address_element'>
                    Страна: Беларусь
                </div>
                <div className='footer_address_element'>
                    Город: Минск
                </div>
                <div className='footer_address_element'>
                    Улица: Сухаревская
                </div>
            </div>
            </div>
        </footer>
    )
}

export default AboutService;