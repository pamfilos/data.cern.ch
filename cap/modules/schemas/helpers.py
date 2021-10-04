# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2016 CERN.
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
"""Utils for Schemas module."""

import os
import json
import pathlib

from jsonschema import Draft4Validator, RefResolver
from invenio_rest.errors import FieldError

from cap.modules.records.errors import get_error_path


def validate_schema_config(config_data):
    cwd = pathlib.Path(__file__).parent.absolute()
    with open(cwd.joinpath('configs/config.json')) as json_:
        schema = json.load(json_)

    schema_store = {}
    schema_search_path = 'cap/modules/schemas/configs'
    fnames = os.listdir(schema_search_path)

    for fname in fnames:
        fpath = os.path.join(schema_search_path, fname)
        if fpath.endswith(".json") and not fpath.endswith("config.json"):
            with open(fpath, "r") as schema_fd:
                _schema = json.load(schema_fd)
                schema_store[f'file:///{fpath}'] = _schema

    resolver = RefResolver(
        "file:///cap/modules/schemas/configs/config.json",
        schema, schema_store
    )
    validator = Draft4Validator(schema, resolver=resolver)

    errors = [
        FieldError(get_error_path(error), str(error.message)).res
        for error in validator.iter_errors(config_data)
    ]

    return errors


class ValidationError(Exception):
    """Schema validation error."""
    errors = None
    description = "Validation Error"

    def __init__(self, errors=None, description=None, **kwargs):
        """Initialize RESTException."""
        super(ValidationError, self).__init__(**kwargs)
        if errors is not None:
            self.errors = errors

        if description:
            self.description = description
