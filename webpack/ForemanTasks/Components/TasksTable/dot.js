import React from 'react';
import '@patternfly/patternfly/patternfly.min.css';

import { ScalprumComponent, ScalprumProvider } from '@scalprum/react-core';
import { AppsConfig } from '@scalprum/core';

const scConfig = {
  landing: {
    name: 'landing',
    manifestLocation: 'http://localhost:8001/foo/bar/fed-mods.json',
    cdnPath: 'http://localhost:8001/foo/bar/',
  },
  widgetLayout: {
    manifestLocation: 'http://localhost:8080/apps/widget-layout/fed-mods.json',
  },
};

const mockUser = {
  entitlements: {},
  identity: {
    account_number: 'string',
    org_id: 'string',
    internal: {
      org_id: 'string',
      account_id: 'string',
    },
    type: 'string',
    user: {
      username: 'string',
      email: 'string',
      first_name: 'string',
      last_name: 'string',
      is_active: 'boolean',
      is_internal: 'boolean',
      is_org_admin: 'boolean',
      locale: 'string',
    },
  },
};

export const Dot = () => {
  return (
    <div>
      <ScalprumProvider
        pluginSDKOptions={{
          pluginLoaderOptions: {
            transformPluginManifest: manifest => {
              if (
                manifest.baseURL === 'auto' &&
                scConfig[manifest.name]?.cdnPath
              ) {
                const cdnPath = scConfig[manifest.name]?.cdnPath;
                const newManifest = {
                  ...manifest,
                  baseURL: cdnPath,
                  loadScripts: manifest.loadScripts.map(
                    script => `${cdnPath}${script}`
                  ),
                };
                return newManifest;
              }
              return manifest;
            },
          },
        }}
        api={{
          chrome: {
            isBeta: () => false,
            on: () => console.log,
            auth: {
              getUser: () => Promise.resolve(mockUser),
            },
          },
        }}
        config={scConfig}
      >
        <ScalprumComponent scope="landing" module="./AnsibleWidget" />
        <ScalprumComponent scope="landing" module="./ExploreCapabilities" />
        <ScalprumComponent scope="landing" module="./SatelliteEntry" />
      </ScalprumProvider>
    </div>
  );
};
