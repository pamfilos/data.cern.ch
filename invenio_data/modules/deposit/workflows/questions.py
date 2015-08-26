# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2014, 2015 CERN.
#
# CERN Analysis Preservation Framework is free software; you can
# redistribute it and/or modify it under the terms of the GNU General
# Public License as published by the Free Software Foundation; either
# version 2 of the License, or (at your option) any later version.
#
# CERN Analysis Preservation Framework is distributed in the hope that
# it will be useful, but WITHOUT ANY WARRANTY; without even the
# implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
# PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this software; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307,
# USA.

from invenio_deposit.types import SimpleRecordDeposition

from .. import forms

__all__ = ['questions']


class questions(SimpleRecordDeposition):
    name = "CMS Statistics Questionnaire (old)"
    name_plural = "CMS Statistics Questionnaire (old)"
    group = "CMS Statistics Questionnaire"
    enabled = True
    draft_definitions = {
        'default': forms.CMSStatisticsQuestionnaire,
    }
