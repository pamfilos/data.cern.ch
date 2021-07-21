# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2020 CERN.
#
# CERN Analysis Preservation Framework is free software; you can redistribute
# it and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# CERN Analysis Preservation Framework is distributed in the hope that it will
# be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with CERN Analysis Preservation Framework; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.
#
# In applying this license, CERN does not
# waive the privileges and immunities granted to it by virtue of its status
# as an Intergovernmental Organization or submit itself to any jurisdiction.
"""Config example data."""

from cap.modules.mail.custom import body


EMPTY_CONFIG = {}

EMPTY_CONFIG_ASSERTIONS = {
    "response": 202,
    "outbox": {},
}

DEFAULT_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "recipients": {
                        "recipients": [
                            {"method": "get_submitter"},
                            {
                                "mails": {
                                    "default": [
                                        "user1@cern0.ch",
                                        "user3@cern0.ch",
                                        "user4@cern0.ch",
                                    ]
                                }
                            },
                        ]
                    }
                }
            ],
            "review": [],
        }
    }
}

DEFAULT_CONFIG_ASSERTIONS = {
    "ctx": {"pid": {"type": "response", "path": "recid"}},
    "response": 202,
    "outbox": {
        0: {
            "subject": [("in", "New Published Analysis")],
            "html": [
                ("in", "can check it"),
                (
                    "in",
                    '<a href="http://analysispreservation.cern.ch/published/{pid}">here</a>',
                ),
            ],
            "recipients": {
                "recipients": [
                    ("in", "cms_user@cern.ch"),
                    ("in", "user1@cern0.ch"),
                    ("in", "user4@cern0.ch"),
                ]
            },
        }
    },
}

DEFAULT_CONFIG_PLAIN = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "body": {"plain": True},
                    "recipients": {
                        "recipients": [
                            {"method": "get_submitter"},
                            {
                                "mails": {
                                    "default": [
                                        "user1@cern0.ch",
                                        "user3@cern0.ch",
                                        "user4@cern0.ch",
                                    ]
                                }
                            },
                        ]
                    },
                }
            ],
            "review": [],
        }
    }
}

DEFAULT_CONFIG_PLAIN_ASSERTIONS = {
    "ctx": {"pid": {"type": "response", "path": "recid"}},
    "response": 202,
    "outbox": {
        0: {
            "subject": [("in", "New Published Analysis")],
            "body": [("in", "can check it"), ("in", "with id {pid}")],
            "recipients": {
                "recipients": [
                    ("in", "cms_user@cern.ch"),
                    ("in", "user1@cern0.ch"),
                    ("in", "user4@cern0.ch"),
                ]
            },
        }
    },
}


DEFAULT_CONFIG_WITH_ERRORS = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "recipients": {
                        "recipients": [
                            {"method": "submitter"},
                            {
                                "mails": [
                                    "user1@cern0.ch",
                                    "user3@cern0.ch",
                                    "user4@cern0.ch",
                                ]
                            },
                        ]
                    }
                }
            ],
            "review": [],
        }
    }
}

DEFAULT_CONFIG_WITH_ERRORS_ASSERTIONS = {
    "ctx": {"cadi_id": {"type": "deposit", "path": "analysis_context.cadi_id"}},
    "response": 202,
    "outbox": {
        # 0: {
        #     "subject": [( "in", "Questionnaire for {cadi_id} published")],
        #     "html": [( "in", "Message with cadi id: {cadi_id}.")],
        #     "recipients": {
        #         "recipients": [
        #             ("in", "cms_user@cern.ch"),
        #             ("in", "user1@cern0.ch"),
        #             ("in", "user2@cern0.ch"),
        #             ("in", "user4@cern0.ch"),
        #         ]
        #     },
        # }
    },
}

SIMPLE_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "subject": {
                        "template": "Questionnaire for {{ cadi_id }} published.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "body": {
                        "template": "Message with cadi id: {{ cadi_id }}.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}
SIMPLE_CONFIG_ASSERTIONS = {
    "ctx": {"cadi_id": {"type": "deposit", "path": "analysis_context.cadi_id"}},
    "response": 202,
    "outbox": {
        0: {
            "subject": [("in", "Questionnaire for {cadi_id} published")],
            "html": [("in", "Message with cadi id: {cadi_id}.")],
            "recipients": {
                "recipients": [
                    ("in", "test-recipient@cern0.ch"),
                ]
            },
        }
    },
}

NESTED_CONDITION_WITH_ERRORS_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "recipients": {
                        "recipients": [
                            {
                                "checks": [
                                    {
                                        "path": "analysis_context.cadi_id",
                                        "condition": "exists",
                                    },
                                    {
                                        "checks": [
                                            {
                                                "path": "analysis_context",
                                                "condition": "exists",
                                            },
                                            {
                                                "path": "test1",
                                                "condition": "error_here",
                                            },
                                        ]
                                    },
                                ],
                                "mails": {"default": ["test@cern.ch"]},
                            }
                        ]
                    }
                }
            ]
        }
    }
}
NESTED_CONDITION_WITH_ERRORS_CONFIG_ASSERTIONS = {
    "response": 202,
    "outbox": {},
}

WRONG_TEMPLATE_FILE_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "body": {
                        "template_file": "wrong/path/template.html",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}

WRONG_TEMPLATE_FILE_CONFIG_ASSERTIONS = {
    "response": 202,
    "outbox": {},
}


CTX_EXAMPLES_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "body": {
                        "template": """
                            Published analysis 
                            
                            CADI ID: {{cadi_id}}
                            ==================

                            revision : {{revision}} |
                            draft_revision : {{draft_revision}} |
                            draft_id : {{draft_id}} |
                            published_id : {{published_id}} |
                            draft_url : {{draft_url}} |
                            published_url : {{published_url}} |
                            working_id : {{working_id}} |
                            working_url : {{working_url}} |
                            submitter_email : {{submitter_email}} |
                            reviewer_email : {{reviewer_email}} |
                            cms_stats_committee_by_pag : {{cms_stats_committee_by_pag}} |
                            get_cms_stat_recipients : {{get_cms_stat_recipients}} |
                        """,
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"method": "revision"},
                            {"method": "draft_revision"},
                            {"method": "draft_id"},
                            {"method": "published_id"},
                            {"method": "draft_url"},
                            {"method": "published_url"},
                            {"method": "working_id"},
                            {"method": "working_url"},
                            {"method": "submitter_email"},
                            {"method": "reviewer_email"},
                            {"method": "cms_stats_committee_by_pag"},
                            {"method": "get_cms_stat_recipients"},
                        ],
                        "plain": True,
                    },
                    "recipients": {
                        "recipients": [
                            "test-recipient@cern0.ch",
                            {"method": "get_cms_stat_recipients"},
                        ]
                    },
                }
            ],
            "review": [],
        }
    }
}
CTX_EXAMPLES_CONFIG_ASSERTIONS = {
    "ctx": {"cadi_id": {"type": "deposit", "path": "analysis_context.cadi_id"}},
    "response": 202,
    "outbox": {
        0: {
            "subject": [("in", "New Published Analysis | CERN Analysis Preservation")],
            "body": [("in", "CADI ID: {cadi_id}")],
            "recipients": {
                "recipients": [
                    ("in", "test-recipient@cern0.ch"),
                    ("in", "admin-rev-2@cern0.ch"),
                ]
            },
        }
    },
}

MUTLIPLE_PUBLISH_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "subject": {
                        "template": 'Questionnaire for {{ cadi_id if cadi_id else "" }} {{ published_id }} - '
                        '{{ "New Version of Published Analysis" if revision > 0 else "New Published Analysis" }} '
                        "| CERN Analysis Preservation",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"method": "revision"},
                            {"method": "published_id"},
                        ],
                    },
                    "body": {
                        "template_file": "mail/body/questionnaire_message_published_plain.html",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"name": "title", "path": "general_title"},
                            {"method": "published_url"},
                            {"method": "submitter_email"},
                        ],
                        "base_template": "mail/analysis_plain_text.html",
                        "plain": True,
                    },
                    "recipients": {
                        "recipients": [
                            "test-recipient@cern0.ch",
                            {
                                "checks": [
                                    {
                                        "path": "analysis_context.cadi_id",
                                        "condition": "exists",
                                    }
                                ],
                                "mails": {
                                    "formatted": [
                                        {
                                            "template": "{% if cadi_id %}hn-cms-{{ cadi_id }}@cern0.ch{% endif %}",
                                            "ctx": [
                                                {
                                                    "name": "cadi_id",
                                                    "type": "path",
                                                    "path": "analysis_context.cadi_id",
                                                }
                                            ],
                                        }
                                    ]
                                },
                            },
                        ]
                    },
                },
                {
                    "subject": {
                        "template_file": "mail/subject/questionnaire_subject_published.html",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"method": "revision"},
                            {"method": "published_id"},
                        ],
                    },
                    "body": {
                        "template_file": "mail/body/questionnaire_message_published.html",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"name": "title", "path": "general_title"},
                            {"method": "published_url"},
                            {"method": "submitter_email"},
                        ],
                    },
                    "recipients": {
                        "recipients": [
                            {"method": "get_owner"},
                            {"method": "get_submitter"},
                        ],
                        "bcc": [
                            {"method": "get_cms_stat_recipients"},
                            {
                                "op": "and",
                                "checks": [
                                    {"path": "ml_app_use", "condition": "exists"}
                                ],
                                "mails": {
                                    "default": [
                                        "ml-conveners-test@cern0.ch",
                                        "ml-conveners-jira-test@cern0.ch",
                                    ]
                                },
                            },
                        ],
                    },
                },
            ]
        }
    }
}

MUTLIPLE_PUBLISH_CONFIG_ASSERTIONS = {
    "ctx": {"cadi_id": {"type": "deposit", "path": "analysis_context.cadi_id"}},
    "response": 202,
    "outbox": {
        0: {
            "subject": [
                ("in", "Questionnaire for {cadi_id} {published_id}"),
                ("in", "Questionnaire for  published"),
                ("in", "New Version of Published Analysis")
            ],
            "body": [
                ("in", "Message with cadi id: {cadi_id}.")
                ("in", "Message with cadi id: {cadi_id}.")
                ("in", "Message with cadi id: {cadi_id}.")
            ],
            "recipients": {
                "recipients": [
                    ("in", "test-recipient@cern0.ch"),
                ]
            },
        }
    },
}

CONDITION_THAT_DOESNT_EXIST_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "recipients": {
                        "recipients": [
                            {
                                "checks": [
                                    {
                                        "path": "test",
                                        "condition": "doesnt_exist",
                                    }
                                ],
                                "mails": {"default": ["test@cern.ch"]},
                            }
                        ]
                    }
                }
            ]
        }
    }
}

NO_RECIPIENTS_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "subject": {
                        "template": "Questionnaire for {{ cadi_id }} published.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "body": {
                        "template": "Message with cadi id: {{ cadi_id }}.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                }
            ]
        }
    }
}

SUBJECT_METHOD_DOESNT_EXIST_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "subject": {"method": "get_subject_not_here"},
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}

SUBJECT_MISSING_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "body": {
                        "template": "Message with cadi id: {{ cadi_id }}.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}

BODY_MISSING_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "subject": {
                        "template": "Questionnaire for {{ cadi_id }} published.",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"}
                        ],
                    },
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}

MULTIPLE_RECIPIENTS_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {"recipients": {"recipients": ["test-recipient@cern0.ch"]}},
                {"recipients": {"bcc": ["test-recipient-bcc@cern0.ch"]}},
            ]
        }
    }
}

CTX_METHOD_MISSING_CONFIG = {
    "notifications": {
        "actions": {
            "publish": [
                {
                    "body": {
                        "template": "Message with cadi id: {{ cadi_id }} and val {{ new_val }}",
                        "ctx": [
                            {"name": "cadi_id", "path": "analysis_context.cadi_id"},
                            {"method": "new_val"},
                        ],
                    },
                    "recipients": {"recipients": ["test-recipient@cern0.ch"]},
                }
            ]
        }
    }
}
