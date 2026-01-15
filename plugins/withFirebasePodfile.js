const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withFirebasePodfile(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      
      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf-8');
        
        // Check if use_frameworks! already exists
        if (!podfileContent.includes('use_frameworks!')) {
          // Add use_frameworks! :linkage => :dynamic after the platform line
          podfileContent = podfileContent.replace(
            /platform :ios, .*/,
            (match) => `${match}\nuse_frameworks! :linkage => :dynamic`
          );
          
          fs.writeFileSync(podfilePath, podfileContent);
          console.log('✅ Added use_frameworks! :linkage => :dynamic to Podfile');
        } else if (!podfileContent.includes(':linkage => :dynamic')) {
          // Replace existing use_frameworks! with dynamic linkage
          podfileContent = podfileContent.replace(
            /use_frameworks!.*/,
            'use_frameworks! :linkage => :dynamic'
          );
          
          fs.writeFileSync(podfilePath, podfileContent);
          console.log('✅ Updated use_frameworks! to use dynamic linkage');
        }
      }
      
      return config;
    },
  ]);
};
