import {
  Array,
  Literal,
  Intersect2, // tslint:disable-line
  Null, // tslint:disable-line
  Number,
  Partial,
  Record,
  String,
  Tuple,
  Tuple1, // tslint:disable-line
  Union,
  Union2, // tslint:disable-line
  Union3, // tslint:disable-line
} from 'runtypes'

export * from 'runtypes'

export const PublisherRuntime = Record({
  publisherName: String,
})

export const PropertyRuntime = Record({
  key: String,
  value: String,
})

export const VersionRuntime = Record({
  lastUpdated: String,
  properties: Array(PropertyRuntime),
})

export const StatisticRuntime = Record({
  statisticName: String,
  value: Number,
})

export const ExtensionRuntime = Record({
  extensionId: String,
  extensionName: String,
  lastUpdated: String,
  publishedDate: String,
  releaseDate: String,
  publisher: PublisherRuntime,
  versions: Array(VersionRuntime),
  statistics: Array(StatisticRuntime),
}).And(
  // Optional properties.
  Partial({
    displayName: String,
    shortDescription: String,
  }),
)

export const ExtensionQueryResultsRuntime = Record({
  results: Tuple(Record({ extensions: Array(ExtensionRuntime) })),
})

export const ScrapeExtensionsPayloadRuntime = Record({
  page: Number,
})

export const ExtractThemesPayloadRuntime = Record({
  extensionId: String,
  extensionName: String,
  publisherName: String,
  lastUpdated: Number,
  publishedDate: Number,
  releaseDate: Number,
  repository: String,
  repositoryOwner: String,
  installs: Number,
  rating: Number,
  ratingCount: Number,
  trendingDaily: Number,
  trendingWeekly: Number,
  trendingMonthly: Number,
}).And(
  // Optional properties.
  Partial({
    displayName: String,
    shortDescription: String,
  }),
)

export const PackageJSONRuntime = Record({
  contributes: Record({
    themes: Array(
      Record({
        path: String,
      }).And(
        Partial({
          label: String,
          uiTheme: String,
        }),
      ),
    ),
  }),
})

export const ThemeTypeRuntime = Union(
  Literal('light'),
  Literal('dark'),
  Literal('hc'),
)

export const ExtractColorsPayloadRuntime = ExtractThemesPayloadRuntime.And(
  Record({
    themeUrl: String,
  }).And(
    Partial({
      themeName: String,
      themeType: ThemeTypeRuntime,
    }),
  ),
)

export const ColorsRuntime = Record({
  // VSCode GUI
  activityBarBackground: String,
  activityBarForeground: String,
  statusBarBackground: String,
  statusBarForeground: String,
  editorBackground: String,
  editorForeground: String,
  editorGroupHeaderTabsBackground: String,
  editorLineNumberForeground: String,
  tabActiveBackground: String,
  tabActiveForeground: String,
  tabInactiveBackground: String,
  tabInactiveForeground: String,
}).And(
  Partial({
    // Optional properties.
    // These colors may not exist in the object but also may be null.
    editorGroupHeaderTabsBorder: String.Or(Null),
    tabActiveBorder: String.Or(Null),
    tabBorder: String.Or(Null),
    contrastActiveBorder: String.Or(Null),
    contrastBorder: String.Or(Null),
  }),
)

export const LineTokenRuntime = Record({
  token: String,
  style: Partial({
    color: String,
    fontWeight: String,
    fontStyle: String,
    textDecoration: String,
  }),
})

export const LineTokensRuntime = Array(LineTokenRuntime)

export const LanguageTokensRuntime = Record({
  javascript: Array(LineTokensRuntime),
})

export const SaveThemePayloadRuntime = ExtractColorsPayloadRuntime.And(
  Record({
    themeId: String,
    themeName: String,
    themeType: ThemeTypeRuntime,
    colors: ColorsRuntime,
    languageTokens: LanguageTokensRuntime,
  }),
)
