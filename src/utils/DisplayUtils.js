const ethers = require('ethers');

class DisplayUtils {
    static getCategories(standard) {
        if (standard !== '721' && standard !== '1155') {
            console.error(`Unknown standard: "${standard}"`);
            return null;
        }
        
        const erc721CategoriesObjs = [
            { name: 'portalclose', display_name: 'PortalClose', pretty_name: '๐ช PortalClose' },
            { name: 'vrfpending', display_name: 'VRFPending', pretty_name: 'โฐ VRFPending' },
            { name: 'portalopen', display_name: 'PortalOpen', pretty_name: '๐ช PortalOpen' },
            { name: 'gotchi', display_name: 'Gotchi', pretty_name: '๐ป Gotchi' },
            { name: 'parcel', display_name: 'Parcel', pretty_name: '๐ Parcel' },
        ];

        const erc1155CategoriesObjs = [
            { name: 'wearable', display_name: 'Wearable', pretty_name: '๐ Wearable' },
            { name: 'badge', display_name: 'Badge', pretty_name: '๐ฎ Badge' },
            { name: 'consumable', display_name: 'Consumable', pretty_name: '๐งช Consumable' },
            { name: 'ticket', display_name: 'Ticket', pretty_name: '๐ซ Ticket' },
            { name: 'building', display_name: 'Building', pretty_name: '๐  Building' },
            { name: 'tile', display_name: 'Tile', pretty_name: '๐งฉ Tile' },
        ];
        
        return (standard === '721') ? erc721CategoriesObjs : erc1155CategoriesObjs;
    }

    static getCollateral(collateralAddress) {
        const collateralsObjs = [
            { address: '0xf4b8888427b00d7caf21654408b7cba2ecf4ebd9', symbol: 'ATUSD'},
            { address: '0x98ea609569bd25119707451ef982b90e3eb719cd', symbol: 'ALINK'},
            { address: '0x1d2a0e5ec8e5bbdca5cb219e649b565d8e5c3360', symbol: 'AMAAVE'},
            { address: '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390', symbol: 'AMWETH'},
            { address: '0x8df3aad3a84da6b69a4da8aec3ea40d9091b2ac4', symbol: 'AMWMATIC'},
            { address: '0x823cd4264c1b951c9209ad0deaea9988fe8429bf', symbol: 'AAAVE'},
            { address: '0xe0b22e0037b130a9f56bbb537684e6fa18192341', symbol: 'ADAI'},
            { address: '0xe20f7d1f0ec39c4d5db01f53554f2ef54c71f613', symbol: 'AYFI'},
            { address: '0x20d3922b4a1a8560e1ac99fba4fade0c849e2142', symbol: 'AWETH'},
            { address: '0x1a13f4ca1d028320a707d99520abfefca3998b7f', symbol: 'AMUSDC'},
            { address: '0x8c8bdbe9cee455732525086264a4bf9cf821c498', symbol: 'AUNI'},
            { address: '0x9719d867a500ef117cc201206b8ab51e794d3f82', symbol: 'AUSDC'},
            { address: '0x5c2ed810328349100a66b82b78a1791b101c9d61', symbol: 'AMWBTC'},
            { address: '0xdae5f1590db13e3b40423b5b5c5fbf175515910b', symbol: 'AUSDT'},
            { address: '0x27f8d03b3a2196956ed754badc28d73be8830a6e', symbol: 'AMDAI'},
            { address: '0x60d55f02a771d515e077c9c2403a1ef324885cec', symbol: 'AMUSDT'}
        ];

        return collateralsObjs.find(collateral => collateral.address === collateralAddress);
    }

    static getGotchiTrait(index) {
        const gotchiTraitsObjs = [
            { short_name: 'NRG', short_pretty_name: '๐ช NRG', pretty_name: '๐ช Energy'},
            { short_name: 'AGR', short_pretty_name: '๐ฅ AGR', pretty_name: '๐ฅ Aggression'},
            { short_name: 'SPK', short_pretty_name: '๐ป SPK', pretty_name: '๐ป Spookiness'},
            { short_name: 'BRS', short_pretty_name: '๐ง  BRS', pretty_name: '๐ง  Brain Size'},
            { short_name: 'EYS', short_pretty_name: '๐ EYS', pretty_name: '๐ Eye Shape'},
            { short_name: 'EYC', short_pretty_name: '๐จ EYC', pretty_name: '๐จ Eye Color'},
        ];

        if (index > gotchiTraitsObjs.length - 1) {
            console.error(`Unknown trait index: "${index}"`);
            return null;
        }
       
        return gotchiTraitsObjs[index];
    }

    static getPrettyCategoryFromInt(standard, categoryInteger) {
        if (standard !== '721' && standard !== '1155') {
            console.error(`Unknown standard: "${standard}"`);
            return null;
        }

        let categories = this.getCategories(standard);

        if (categoryInteger > categories.length - 1) {
            console.error(`Unknown category: "${categoryInteger}"`);
            return null;
        }

        return categories[categoryInteger].pretty_name;
    }

    static getCategoryIntegerFromString(standard, categoryString) {
        if (standard !== '721' && standard !== '1155') {
            console.error(`Unknown standard: "${standard}"`);
            return null;
        }
        
        const categories = this.getCategories(standard);
        
        return Object.keys(categories).find(key => categories[key].name === categoryString);
        
    }

    static getListingStatusString(listing) {
        if (listing.purchased)
            return '^RSOLD OUT^';
        else if (listing.cancelled) 
            return '^YCANCELLED^';
        else return '^GAVAILABLE^'
    }

    static generateBaazaarURLString(standard, listingID) {
        if (standard !== '721' && standard !== '1155') {
            console.error(`Unknown standard: "${standard}"`);
            return null;
        }

        return `https://app.aavegotchi.com/baazaar/erc${standard}/${listingID}`;
    }

    static generateGotchiInfoURL(gotchiID) {
        return `https://app.aavegotchi.com/gotchi/${gotchiID}`;
    }

    static generateGotchiExperienceProgressBar(gotchi) {
        const nextLevelXP = parseInt(gotchi.experience) + parseInt(gotchi.toNextLevel);
        let progressPercent = 0;
        let progressBar = '';
        
        if (gotchi.experience == 0) {
            return `^M${gotchi.experience}^K/^m${nextLevelXP} ^K| โโโโโโโโโโ | ${progressPercent}%`;
        }
        else {
            progressPercent = (gotchi.experience * 100) / nextLevelXP;
            const progressSections = Math.round(progressPercent / 10);
            
            for (let i = 0; i < 10; i++) {
                (i < progressSections) 
                    ? progressBar = progressBar.concat('^Mโ')
                    : progressBar = progressBar.concat('^Kโ');
            }
        }

        return `^M${gotchi.experience}^K/^m${nextLevelXP} ^K| ${progressBar} | ${Math.round(progressPercent)}%`;
    }

    static generateGotchiTraitsString(gotchi) {
        let str = '';

        for (let i = 0; i < gotchi.numericTraits.length; i++) {
            const traitName = this.getGotchiTrait(i).short_pretty_name;
            const baseTrait = gotchi.numericTraits[i];
            const modTrait = gotchi.modifiedNumericTraits[i];
            const setsTrait = gotchi.withSetsNumericTraits[i];
            
            str = str.concat(`${traitName} ^C${baseTrait}^K-^G${modTrait}^K-^Y${setsTrait}\n`);
        }
        
        return str;
    }

    static formatTimeString(timestamp) {
        const time = new Date(timestamp * 1000);
        return time.toLocaleString();
    }

    static getVolumeString(volume) { 
        const ethFormat = ethers.utils.formatEther(volume)
        return `${ethFormat.slice(0, ethFormat.indexOf('.') + 3)}$`;
    }

    static getHeader(version) {
        return `              
                                                     ...@@@@@@@@@...                                                    
                                                .....@@@@@@@@@@@@@@@.....                                               
                                             ...@@@@@@@@@&.//\\.&@@@@@@@@@...                                             
                                          ......@@@@@@@@@.//..\\.@@@@@@@@@......                                         
                                      ..........@@@@@@@@@@@...@@@@@@@@@@@..........                                      
                                    ............@@@@@...@@@@@@@@@...@@@@@............                                    
                                 ...............@@@.......@@@@@.......@@@...............                                
                                ................@@@@@...@@@@@@@@@...@@@@@................                              
                              ..........@@@@....@@@@@@@@.@@@@@@@.@@@@@@@@..................                              
                             ...........@@@@@@..@@@@@@@@@@.....@@@@@@@@@@...................                            
                             ..............#&@..@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@...........                            
     ....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.@@@@.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....        
                   .::    .   .::::::.      :::. ::::::::::::  .,-:::::   ::   .: .,:::::: :::::::..   
                  ';;,  ;;  ;;;' ;;';;     ;;';;;;;;;;;;'''',;;;''''''  ,;;   ;;,;;;;'''' ;;;;'';;;;  
                  '[[, [[, [[' ,[[ '[[,  ,[[ '[[,   [[     [[[        ,[[[,,,[[[ [[cccc   [[[,/[[['  
                    Y$c$$$c$P c$$$cc$$$cc$$$cc$$$c  $$     $$$        "$$$"""$$$ $$""""   $$$$$$c    
                     "88"888   888   888,888   888, 88,    '88bo,__,o, 888   "88o888oo,__ 888b "88bo,
                      "M "M"   AMM   ""' GMM   ""'  WNA      "WAGMI"MP"MMM    GMM""""AAaaaHHHH   "W"
     ....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [v${version}] @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....                                    
                            
                                                   Aavegotchi Explorer
        `;
    }
}

module.exports = DisplayUtils;

