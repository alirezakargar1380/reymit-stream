const Schema = require('validate');
const _ = require('lodash');
import log from "./../../../utils/log.utility"
import Exception from "./../../../utils/error.utility"

class Validate {
    private fields: {
        target_background_box: {
            type: ObjectConstructor
        }
    };
    private errorMessages: {
        length: () => string;
        match: () => string;
        type: () => string;
        required: () => string;
        validation: () => string
        enum: () => string
    };
    private headerErrorMessages: {
        length: () => string;
        type: () => string;
        required: () => string;
        validation: () => string
    };

    constructor() {
        this.fields = {
            target_background_box: {
                type: Object
            },
        };

        this.errorMessages = {
            required: () => 'ERROR_MESSAGE_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
            match: () => 'ERROR_MESSAGE_CANNOT_PASS_REGEX',
            enum: () => 'ERROR_MESSAGE_CANNOT_PASS_ENUM',
        };

        this.headerErrorMessages = {
            required: () => 'ERROR_MESSAGE_HEADER_REQUIRED',
            validation: () => 'ERROR_MESSAGE_INVALID',
            type: () => 'ERROR_MESSAGE_WRONG_TYPE',
            length: () => 'ERROR_MESSAGE_INVALID_LENGTH',
        };
    }

    update_appearance_settings(items: any, throwErrors = true) {
        const schema = new Schema({
            general_settings: _.assign({}, {
                type: Object,
                required: true,
            }, {
                measuring_the_content_of_the_tool_and_the_box: { type: Boolean, required: true },
            }),

            target_background_box: _.assign({}, {
                type: Object,
                required: true,
            }, {
                show_background: { type: Boolean, required: true },
                background_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                show_shadow: { type: Boolean, required: true },
                radius: { type: Number, required: true },
            }),

            target_title: _.assign({}, {
                type: Object,
                required: true,
            }, {
                show_target_title: { type: Boolean, required: true },
                text_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                title_text_format: { type: String, required: true },
                font_size: { type: Number, required: true },
                show_text_shadow: { type: Boolean, required: true },
            }),

            target_progress_bar: _.assign({}, {
                type: Object,
                required: true,
            }, {
                show_progress_bar: { type: Boolean, required: true },
                bar_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                bar_background_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                bar_text_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                font_size: { type: Number, required: true },
                radius_of_holder_bar: { type: Number, required: true },
                radius_of_inside_bar: { type: Number, required: true },
                bar_height: { type: Number, required: true },
                min_width_of_process_bar: { type: Number, required: true },
                stroke_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                to_advance_the_bar: { type: String, required: true },
            }),

            target_detail: _.assign({}, {
                type: Object,
                required: true,
            }, {
                show_target_detail: { type: Boolean, required: true },
                text_color: { type: String, required: true, match: /^#[0-9a-fA-F]{6}$/ },
                text_format_detail: { type: String, required: true },
                font_size: { type: Number, required: true, size: { min: 1, max: 128 } },
            }),

        });

        schema.message(this.errorMessages);

        return this.sanitizeErrors(
            schema.validate(_.assign({}, items)),
            throwErrors,
        );
    }

    sanitizeErrors(errors: any, throwErrors: boolean) {

        const errs = _.map(
            errors,
            (error: any) => ({
                [error.path]: error.message
            }),
        );

        if (_.size(errs)) {
            log.error(`Validation failed, ${JSON.stringify(errs)}`);

            if (throwErrors) {
                throw Exception.setError(errs, throwErrors);
            }
        }

        return errs;
    }
}

export default new Validate();